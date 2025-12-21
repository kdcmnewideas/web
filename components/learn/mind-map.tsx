import { MindMapNode } from "@/types/types";
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minus,
    Plus
} from "lucide-react-native";
import React, {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { PanResponder, Pressable, View } from "react-native";
import Svg, { ForeignObject, G, Path } from "react-native-svg";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface LearnMindMapProps {
  rootNode?: MindMapNode;
  isDark?: boolean;
}

interface PositionedNode extends MindMapNode {
  x: number;
  y: number;
  depth: number;
  parentId?: string;
}

const MindMap = ({ rootNode, isDark = false }: LearnMindMapProps) => {
  const [scale, setScale] = useState(0.85);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["root"])
  );

  const nodeWidth = 240;
  const nodeHeight = 50;
  const horizontalGap = 100;
  const verticalGap = 20;

  // Fallback data if none provided
  const data = rootNode || {
    id: "root",
    label: "Advancing Multimodal AI in Medicine",
    children: [
      { id: "c1", label: "Med-Gemini Model Family" },
      {
        id: "c2",
        label: "Key Applications & Tasks",
        children: [{ id: "c2-1", label: "Clinical Diagnostics" }],
      },
      { id: "c3", label: "Evaluation and Benchmarking" },
      { id: "c4", label: "Related Genomic Discovery Methods" },
    ],
  };


  // Toggle node expansion
  const toggleNode = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedIds(next);
  };

  // Calculate Layout Recursively
  const layout = useMemo(() => {
    const nodes: PositionedNode[] = [];
    const connections: {
      from: { x: number; y: number };
      to: { x: number; y: number };
      id: string;
    }[] = [];

    const getSubtreeHeight = (node: MindMapNode): number => {
      if (
        !expandedIds.has(node.id) ||
        !node.children ||
        node.children.length === 0
      ) {
        return nodeHeight;
      }
      const childrenHeight = node.children.reduce(
        (acc, child) => acc + getSubtreeHeight(child),
        0
      );
      const gaps = (node.children.length - 1) * verticalGap;
      return Math.max(nodeHeight, childrenHeight + gaps);
    };

    const positionNodes = (
      node: MindMapNode,
      x: number,
      y: number,
      depth: number
    ) => {
      nodes.push({ ...node, x, y, depth });

      if (
        expandedIds.has(node.id) &&
        node.children &&
        node.children.length > 0
      ) {
        const totalH = getSubtreeHeight(node);
        let currentY = y - totalH / 2;

        node.children.forEach((child) => {
          const childH = getSubtreeHeight(child);
          const childY = currentY + childH / 2;
          const childX = x + nodeWidth + horizontalGap;

          connections.push({
            id: `link-${node.id}-${child.id}`,
            from: { x: x + nodeWidth / 2, y },
            to: { x: childX - nodeWidth / 2, y: childY },
          });

          positionNodes(child, childX, childY, depth + 1);
          currentY += childH + verticalGap;
        });
      }
    };

    positionNodes(data, 0, 0, 0);
    return { nodes, connections };
  }, [data, expandedIds]);

  // Reset view when data changes
  useEffect(() => {
    setOffset({ x: 0, y: 0 });
    setScale(0.85);
    setExpandedIds(new Set(["root"]));
  }, [rootNode]);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (e.button !== 0) return;
//     setIsDragging(true);
//     setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
//   };

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!isDragging) return;
//       setOffset({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y,
//       });
//     },
//     [isDragging, dragStart]
//   );

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//   }, []);

//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);
//     } else {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     }
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.3));
  };

  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
  
  // This ref mimics your "dragStart" logic
  const dragStart = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      // 1. Equivalent to "should I start dragging?"
      onStartShouldSetPanResponder: () => true,

      // 2. Equivalent to handleMouseDown
      onPanResponderGrant: (e, gestureState) => {
        setIsDragging(true);
        
        // e.nativeEvent.pageX/Y are the mobile equivalents of clientX/Y
        dragStart.current = {
          x: e.nativeEvent.pageX - offset.x,
          y: e.nativeEvent.pageY - offset.y,
        };
      },

      // 3. Equivalent to handleMouseMove (Optional but likely needed)
      onPanResponderMove: (e, gestureState) => {
        setOffset({
          x: e.nativeEvent.pageX - dragStart.current.x,
          y: e.nativeEvent.pageY - dragStart.current.y,
        });
      },

      // 4. Equivalent to handleMouseUp
      onPanResponderRelease: () => {
        setIsDragging(false);
      },
    })
  ).current;

  const theme = {
    bg: isDark ? "bg-[#1e2124]" : "bg-slate-50",
    nodeBg: isDark ? "bg-slate-800" : "bg-white",
    nodeBorder: isDark ? "border-slate-700" : "border-slate-200",
    text: isDark ? "text-slate-200" : "text-slate-800",
    line: isDark ? "#4b5563" : "#cbd5e1",
    rootBg: "bg-indigo-600",
    rootText: "text-white",
    controlsBg: isDark ? "bg-slate-900/90" : "bg-white/95",
    controlsText: isDark ? "text-slate-400" : "text-slate-500",
  };

  return (
    <View
    {...panResponder.panHandlers}
      className={`
        relative overflow-hidden cursor-grab active:cursor-grabbing select-none transition-all duration-300 w-full md:h-full rounded-2xl
        ${theme.bg}
      `}
      onTouchEnd={(e)=> e.stopPropagation()}
      onTouchMove={(e)=> e.stopPropagation()}
      onTouchStart={(e)=> e.stopPropagation()}
      onPointerMove={(e)=> e.stopPropagation()}
      onPointerLeave={(e)=> e.stopPropagation()}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={"-500 -350 1000 700"}
        className="block overflow-visible"
        style={{ pointerEvents: "none" }}
      >
        <G
          transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}
          className="transition-transform duration-300 ease-out"
          style={{ pointerEvents: "auto" }}
        >
          {/* Connection Lines */}
          {layout.connections.map((conn) => (
            <Path
              key={conn.id}
              d={`M ${conn.from.x} ${conn.from.y} C ${conn.from.x + horizontalGap / 2} ${conn.from.y}, ${conn.to.x - horizontalGap / 2} ${conn.to.y}, ${conn.to.x} ${conn.to.y}`}
              fill="none"
              stroke={theme.line}
              strokeWidth="2"
              
            />
          ))}

          {/* Nodes */}
          {layout.nodes.map((node) => {
            const isRoot = node.id === "root";
            const hasChildren = node.children && node.children.length > 0;
            const isExpanded = expandedIds.has(node.id);

            return (
              <ForeignObject
                key={node.id}
                x={node.x - nodeWidth / 2}
                y={node.y - nodeHeight / 2}
                width={nodeWidth}
                height={nodeHeight + 10}
              >
                <View
                  className="flex-row items-center h-full pointer-events-auto w-full"
                >
                    <Pressable  onPress={(e) => hasChildren && toggleNode(node.id)} className="w-full">
                  <View
                    className={`flex-1 w-full ${isRoot ? theme.rootBg : theme.nodeBg} border ${isRoot ? "border-indigo-700" : theme.nodeBorder} rounded-xl px-4 py-3 shadow-sm flex-row items-center justify-between hover:scale-[1.02] transition-all cursor-pointer backdrop-blur-sm group`}
                   
                  >
                    <Text
                      className={`text-sm font-bold truncate ${isRoot ? theme.rootText : theme.text}`}
                    >
                      {node.label}
                    </Text>
                    {hasChildren && (
                      <View
                        className={`w-5 h-5 rounded-full flex items-center justify-center ml-2 transition-colors ${isRoot ? "bg-indigo-500/50 text-white" : "bg-slate-50 text-slate-400 group-hover:text-indigo-600"}`}
                      >
                        {isExpanded ? (
                          <ChevronLeft className="w-3.5 h-3.5" size={14}/>
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" size={14}/>
                        )}
                      </View>
                    )}
                  </View>
                  </Pressable>
                </View>
              </ForeignObject>
            );
          })}
        </G>
      </Svg>

      {/* Controls Overlay */}
      <View
        className={`absolute bottom-6 right-6 flex flex-col gap-2 z-20`}
      >
        <View
          className={`flex flex-col ${theme.controlsBg} backdrop-blur-md rounded-xl border ${isDark ? "border-white/10" : "border-slate-200"} overflow-hidden shadow-xl`}
        >
          <View
            className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"} mx-2`}
          ></View>
          <Button
            variant={'ghost'}
            onPress={handleReset}
            className={`p-3 ${theme.controlsText} hover:bg-indigo-600/10 hover:text-indigo-600 transition-all`}
            onTouchEnd={(e)=> e.stopPropagation()}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          <View
            className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"} mx-2`}
          ></View>
          <Button
           variant={'ghost'}
            onPress={handleZoomIn}
            className={`p-3 ${theme.controlsText} hover:bg-indigo-600/10 hover:text-indigo-600 transition-all`}
           onTouchEnd={(e)=> e.stopPropagation()}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <View
            className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"} mx-2`}
          ></View>
          <Button
           variant={'ghost'}
            onPress={handleZoomOut}
            className={`p-3 ${theme.controlsText} hover:bg-indigo-600/10 hover:text-indigo-600 transition-all`}
            onTouchEnd={(e)=> e.stopPropagation()}
            onTouchMove={(e)=> e.stopPropagation()}
          >
            <Minus className="w-4 h-4" />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default MindMap;
