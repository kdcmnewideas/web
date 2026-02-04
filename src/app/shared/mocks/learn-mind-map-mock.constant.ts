import { MindMapNode } from '../../features/student/learn/learn-mind-map/learn-mind-map';

export const MIND_MAP_MOCK_DATA: MindMapNode = {
  id: 'root',
  label: 'AP Class 9 Comprehensive Curriculum',
  children: [
    {
      id: 'maths',
      label: 'Mathematics',
      children: [
        {
          id: 'm-c1',
          label: 'Real Numbers',
          children: [
            {
              id: 'm-c1-t1',
              label: 'Number Systems',
              children: [
                {
                  id: 'm-c1-t1-st1',
                  label: 'Rational and Irrational Numbers',
                  children: [{ id: 'm-c1-t1-st1-con1', label: 'Properties and Representation' }],
                },
              ],
            },
          ],
        },
        {
          id: 'm-c2',
          label: 'Triangles and Congruency',
          children: [
            {
              id: 'm-c2-t1',
              label: 'Triangle Congruency',
              children: [
                {
                  id: 'm-c2-t1-st1',
                  label: 'Congruency Criteria',
                  children: [{ id: 'm-c2-t1-st1-con1', label: 'SSS, SAS, ASA, AAS, and RHS' }],
                },
              ],
            },
          ],
        },
        {
          id: 'm-c3',
          label: 'Quadrilaterals',
          children: [
            {
              id: 'm-c3-t1',
              label: 'Properties of Quadrilaterals',
              children: [
                {
                  id: 'm-c3-t1-st1',
                  label: 'Parallelograms and Theorems',
                  children: [
                    { id: 'm-c3-t1-st1-con1', label: 'Diagonal Properties and Relationships' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'science',
      label: 'Science',
      children: [
        {
          id: 'sci-c1',
          label: 'Physics: Motion',
          children: [
            {
              id: 'sci-c1-t1',
              label: 'Describing Motion',
              children: [
                {
                  id: 'sci-c1-t1-st1',
                  label: 'Equations of Motion',
                  children: [{ id: 'sci-c1-t1-st1-con1', label: 'Derivation and Applications' }],
                },
              ],
            },
          ],
        },
        {
          id: 'sci-c2',
          label: 'Chemistry: Atoms and Molecules',
          children: [
            {
              id: 'sci-c2-t1',
              label: 'Atomic Structure',
              children: [
                {
                  id: 'sci-c2-t1-st1',
                  label: 'Mole Concept',
                  children: [
                    { id: 'sci-c2-t1-st1-con1', label: "Avogadro's Number and Applications" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'sci-c3',
          label: 'Biology: Cells and Life',
          children: [
            {
              id: 'sci-c3-t1',
              label: 'Cell Structure and Division',
              children: [
                {
                  id: 'sci-c3-t1-st1',
                  label: 'Cell Cycle and Division Processes',
                  children: [
                    { id: 'sci-c3-t1-st1-con1', label: 'Mitosis and Meiosis' },
                    { id: 'sci-c3-t1-st1-con2', label: 'Organelles and Their Functions' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'sci-c4',
          label: 'Biology: Photosynthesis',
          children: [
            {
              id: 'sci-c4-t1',
              label: 'Metabolic Processes in Plants',
              children: [
                {
                  id: 'sci-c4-t1-st1',
                  label: 'Photosynthesis',
                  children: [
                    { id: 'sci-c4-t1-st1-con1', label: 'Light and Dark Reactions' },
                    { id: 'sci-c4-t1-st1-con2', label: 'Chloroplast Structure and Pigments' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'social',
      label: 'Social Studies',
      children: [
        {
          id: 'soc-c1',
          label: 'Our Earth: Geography',
          children: [
            {
              id: 'soc-c1-t1',
              label: 'Location and Coordinates',
              children: [
                {
                  id: 'soc-c1-t1-st1',
                  label: 'Grid System',
                  children: [{ id: 'soc-c1-t1-st1-con1', label: 'Latitude and Longitude' }],
                },
              ],
            },
          ],
        },
        {
          id: 'soc-c2',
          label: 'Democratic Governance',
          children: [
            {
              id: 'soc-c2-t1',
              label: 'What is Democracy?',
              children: [
                {
                  id: 'soc-c2-t1-st1',
                  label: 'Democratic Principles and Equality',
                  children: [
                    { id: 'soc-c2-t1-st1-con1', label: 'Political Equality and Decision Making' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'soc-c3',
          label: 'Poverty and Social Programs',
          children: [
            {
              id: 'soc-c3-t1',
              label: 'Poverty as a Challenge',
              children: [
                {
                  id: 'soc-c3-t1-st1',
                  label: 'Anti-Poverty Measures',
                  children: [
                    {
                      id: 'soc-c3-t1-st1-con1',
                      label: 'MGNREGA and Government Initiatives',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'english',
      label: 'English',
      children: [
        {
          id: 'eng-c1',
          label: 'The Fun They Had',
          children: [
            {
              id: 'eng-c1-t1',
              label: 'Future Schools',
              children: [
                {
                  id: 'eng-c1-t1-st1',
                  label: 'Technology in Education',
                  children: [
                    { id: 'eng-c1-t1-st1-con1', label: 'Mechanical Teacher vs Human Teacher' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'eng-c2',
          label: 'Tenses (Grammar)',
          children: [
            {
              id: 'eng-c2-t1',
              label: 'Verb Forms',
              children: [
                {
                  id: 'eng-c2-t1-st1',
                  label: 'Present & Past Perfect',
                  children: [
                    { id: 'eng-c2-t1-st1-con1', label: 'Sequence of Tenses in Complex Sentences' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'eng-c3',
          label: 'Voice (Grammar)',
          children: [
            {
              id: 'eng-c3-t1',
              label: 'Active and Passive Transformation',
              children: [
                {
                  id: 'eng-c3-t1-st1',
                  label: 'Transitive Verbs',
                  children: [
                    { id: 'eng-c3-t1-st1-con1', label: 'Passive Voice in Imperative Sentences' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'eng-c4',
          label: 'Parts of Speech (Grammar)',
          children: [
            {
              id: 'eng-c4-t1',
              label: 'Word Classes',
              children: [
                {
                  id: 'eng-c4-t1-st1',
                  label: 'Conjunctions and Prepositions',
                  children: [
                    { id: 'eng-c4-t1-st1-con1', label: 'Usage of Correlative Conjunctions' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
