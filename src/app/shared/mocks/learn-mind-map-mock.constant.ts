import { MindMapNode } from '../../features/student/learn/learn-mind-map/learn-mind-map';

export const MIND_MAP_MOCK_DATA: MindMapNode = {
  id: 'root',
  label: 'Chain Rule in Calculus',
  children: [
    {
      id: 'c1',
      label: 'Fundamental Concepts',
      children: [
        { id: 'c1-1', label: 'Definition: dy/dx = (dy/du) × (du/dx)' },
        { id: 'c1-2', label: 'Composite Functions: f(g(x))' },
        { id: 'c1-3', label: 'Inner & Outer Functions' },
        {
          id: 'c1-4',
          label: 'Core Principle',
          children: [
            { id: 'c1-4-1', label: 'Differentiate Outer Function' },
            { id: 'c1-4-2', label: 'Multiply by Inner Derivative' },
            { id: 'c1-4-3', label: 'Keep Inner Function Unchanged' },
          ],
        },
      ],
    },
    {
      id: 'c2',
      label: 'Basic Applications',
      children: [
        {
          id: 'c2-1',
          label: 'Polynomial Chains',
          children: [
            { id: 'c2-1-1', label: 'd/dx[(3x+2)⁵]' },
            { id: 'c2-1-2', label: 'd/dx[(x²+1)³]' },
            { id: 'c2-1-3', label: 'd/dx[(2x-5)⁴]' },
          ],
        },
        {
          id: 'c2-2',
          label: 'Trigonometric Chains',
          children: [
            { id: 'c2-2-1', label: 'd/dx[sin(3x)]' },
            { id: 'c2-2-2', label: 'd/dx[cos(x²)]' },
            { id: 'c2-2-3', label: 'd/dx[tan(2x+1)]' },
          ],
        },
        {
          id: 'c2-3',
          label: 'Exponential & Logarithmic',
          children: [
            { id: 'c2-3-1', label: 'd/dx[e^(3x)]' },
            { id: 'c2-3-2', label: 'd/dx[ln(x²)]' },
            { id: 'c2-3-3', label: 'd/dx[a^(2x)]' },
          ],
        },
      ],
    },
    {
      id: 'c3',
      label: 'Advanced Techniques',
      children: [
        {
          id: 'c3-1',
          label: 'Multiple Chains',
          children: [
            { id: 'c3-1-1', label: 'Three or more nested functions' },
            { id: 'c3-1-2', label: 'Extended chain rule formula' },
            { id: 'c3-1-3', label: 'd/dx[sin(cos(x))]' },
          ],
        },
        {
          id: 'c3-2',
          label: 'Combined with Product Rule',
          children: [
            { id: 'c3-2-1', label: 'd/dx[x × sin(2x)]' },
            { id: 'c3-2-2', label: 'd/dx[(x+1) × (2x)³]' },
          ],
        },
        {
          id: 'c3-3',
          label: 'Combined with Quotient Rule',
          children: [
            { id: 'c3-3-1', label: 'd/dx[sin(x)/x²]' },
            { id: 'c3-3-2', label: 'd/dx[(x+1)²/(2x-1)³]' },
          ],
        },
      ],
    },
    {
      id: 'c4',
      label: 'Related Derivative Rules',
      children: [
        {
          id: 'c4-1',
          label: 'Power Rule',
          children: [
            { id: 'c4-1-1', label: 'd/dx[xⁿ] = n × x^(n-1)' },
            { id: 'c4-1-2', label: 'Foundation for chain rule' },
          ],
        },
        {
          id: 'c4-2',
          label: 'Product Rule',
          children: [
            { id: 'c4-2-1', label: "d/dx[f×g] = f'g + fg'" },
            { id: 'c4-2-2', label: 'Often combined with chain' },
          ],
        },
        {
          id: 'c4-3',
          label: 'Quotient Rule',
          children: [
            { id: 'c4-3-1', label: "d/dx[f/g] = (f'g - fg')/g²" },
            { id: 'c4-3-2', label: 'Special case of product rule' },
          ],
        },
      ],
    },
    {
      id: 'c5',
      label: 'Common Function Derivatives',
      children: [
        {
          id: 'c5-1',
          label: 'Trigonometric',
          children: [
            { id: 'c5-1-1', label: "d/dx[sin(u)] = cos(u) × u'" },
            { id: 'c5-1-2', label: "d/dx[cos(u)] = -sin(u) × u'" },
            { id: 'c5-1-3', label: "d/dx[tan(u)] = sec²(u) × u'" },
          ],
        },
        {
          id: 'c5-2',
          label: 'Exponential & Log',
          children: [
            { id: 'c5-2-1', label: "d/dx[e^u] = e^u × u'" },
            { id: 'c5-2-2', label: "d/dx[ln(u)] = (1/u) × u'" },
            { id: 'c5-2-3', label: "d/dx[a^u] = a^u × ln(a) × u'" },
          ],
        },
        {
          id: 'c5-3',
          label: 'Power Functions',
          children: [
            { id: 'c5-3-1', label: "d/dx[u^n] = n × u^(n-1) × u'" },
            { id: 'c5-3-2', label: "d/dx[√u] = (1/(2√u)) × u'" },
          ],
        },
      ],
    },
    {
      id: 'c6',
      label: 'Problem Solving Strategy',
      children: [
        {
          id: 'c6-1',
          label: 'Step 1: Identify Structure',
          children: [
            { id: 'c6-1-1', label: 'Recognize composite function' },
            { id: 'c6-1-2', label: 'Identify inner function u' },
            { id: 'c6-1-3', label: 'Identify outer function f(u)' },
          ],
        },
        {
          id: 'c6-2',
          label: 'Step 2: Apply Chain Rule',
          children: [
            { id: 'c6-2-1', label: 'Find du/dx (derivative of inner)' },
            { id: 'c6-2-2', label: 'Find df/du (derivative of outer)' },
            { id: 'c6-2-3', label: 'Multiply: df/dx = (df/du) × (du/dx)' },
          ],
        },
        {
          id: 'c6-3',
          label: 'Step 3: Simplify',
          children: [
            { id: 'c6-3-1', label: 'Substitute back original function' },
            { id: 'c6-3-2', label: 'Factor and simplify' },
            { id: 'c6-3-3', label: 'Final answer' },
          ],
        },
      ],
    },
    {
      id: 'c7',
      label: 'Real-World Applications',
      children: [
        {
          id: 'c7-1',
          label: 'Physics & Engineering',
          children: [
            { id: 'c7-1-1', label: 'Velocity and Acceleration' },
            { id: 'c7-1-2', label: 'Wave Propagation' },
            { id: 'c7-1-3', label: 'Heat Transfer' },
          ],
        },
        {
          id: 'c7-2',
          label: 'Economics & Business',
          children: [
            { id: 'c7-2-1', label: 'Rate of Change Analysis' },
            { id: 'c7-2-2', label: 'Elasticity of Demand' },
            { id: 'c7-2-3', label: 'Growth Models' },
          ],
        },
        {
          id: 'c7-3',
          label: 'Biology & Medicine',
          children: [
            { id: 'c7-3-1', label: 'Drug Concentration' },
            { id: 'c7-3-2', label: 'Population Growth' },
            { id: 'c7-3-3', label: 'Disease Spread' },
          ],
        },
      ],
    },
    {
      id: 'c8',
      label: 'Common Mistakes',
      children: [
        {
          id: 'c8-1',
          label: 'Forgetting Inner Derivative',
          children: [
            { id: 'c8-1-1', label: 'Wrong: d/dx[sin(2x)] = cos(2x)' },
            { id: 'c8-1-2', label: 'Right: d/dx[sin(2x)] = 2cos(2x)' },
          ],
        },
        {
          id: 'c8-2',
          label: 'Incorrect Function Identification',
          children: [
            { id: 'c8-2-1', label: 'Confusing inner and outer' },
            { id: 'c8-2-2', label: 'Missing nested levels' },
          ],
        },
        {
          id: 'c8-3',
          label: 'Algebraic Errors',
          children: [
            { id: 'c8-3-1', label: 'Sign errors' },
            { id: 'c8-3-2', label: 'Simplification mistakes' },
          ],
        },
      ],
    },
  ],
};
