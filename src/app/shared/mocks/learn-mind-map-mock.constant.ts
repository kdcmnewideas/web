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
                  label: 'Irrational Numbers',
                  children: [{ id: 'm-c1-t1-st1-con1', label: 'Representing √n on Number Line' }],
                },
              ],
            },
          ],
        },
        {
          id: 'm-c2',
          label: 'Polynomials and Factorisation',
          children: [
            {
              id: 'm-c2-t1',
              label: 'Factorisation of Polynomials',
              children: [
                {
                  id: 'm-c2-t1-st1',
                  label: 'Theorems',
                  children: [{ id: 'm-c2-t1-st1-con1', label: 'Remainder and Factor Theorem' }],
                },
              ],
            },
          ],
        },
        {
          id: 'm-c3',
          label: 'Triangles',
          children: [
            {
              id: 'm-c3-t1',
              label: 'Congruency',
              children: [
                {
                  id: 'm-c3-t1-st1',
                  label: 'Congruency Rules',
                  children: [{ id: 'm-c3-t1-st1-con1', label: 'SSS, SAS, and RHS Criteria' }],
                },
              ],
            },
          ],
        },
        {
          id: 'm-c4',
          label: 'Quadrilaterals',
          children: [
            {
              id: 'm-c4-t1',
              label: 'Properties of Quadrilaterals',
              children: [
                {
                  id: 'm-c4-t1-st1',
                  label: 'Parallelograms',
                  children: [
                    { id: 'm-c4-t1-st1-con1', label: 'Diagonal Properties of Parallelograms' },
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
          label: 'Motion (Physics)',
          children: [
            {
              id: 'sci-c1-t1',
              label: 'Describing Motion',
              children: [
                {
                  id: 'sci-c1-t1-st1',
                  label: 'Equations of Motion',
                  children: [{ id: 'sci-c1-t1-st1-con1', label: 'Derivation by Graphical Method' }],
                },
              ],
            },
          ],
        },
        {
          id: 'sci-c2',
          label: 'Atoms and Molecules (Chemistry)',
          children: [
            {
              id: 'sci-c2-t1',
              label: 'Laws of Chemical Combination',
              children: [
                {
                  id: 'sci-c2-t1-st1',
                  label: 'Atomic Mass',
                  children: [
                    { id: 'sci-c2-t1-st1-con1', label: 'Concept of Mole and Avogadro Number' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'sci-c3',
          label: 'The Fundamental Unit of Life (Biology)',
          children: [
            {
              id: 'sci-c3-t1',
              label: 'Cell Reproduction',
              children: [
                {
                  id: 'sci-c3-t1-st1',
                  label: 'Cell Division',
                  children: [
                    { id: 'sci-c3-t1-st1-con1', label: 'Mitosis (Equational Division)' },
                    { id: 'sci-c3-t1-st1-con2', label: 'Meiosis (Reduction Division)' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'sci-c4',
          label: 'Plant Tissues (Biology)',
          children: [
            {
              id: 'sci-c4-t1',
              label: 'Metabolic Processes',
              children: [
                {
                  id: 'sci-c4-t1-st1',
                  label: 'Photosynthesis',
                  children: [
                    { id: 'sci-c4-t1-st1-con1', label: 'Structure of Chloroplast and Chlorophyll' },
                    {
                      id: 'sci-c4-t1-st1-con2',
                      label: 'Light-dependent and Light-independent Reactions',
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
      id: 'social',
      label: 'Social Studies',
      children: [
        {
          id: 'soc-c1',
          label: 'Our Earth',
          children: [
            {
              id: 'soc-c1-t1',
              label: 'Evolution of Earth',
              children: [
                {
                  id: 'soc-c1-t1-st1',
                  label: 'Grid System',
                  children: [{ id: 'soc-c1-t1-st1-con1', label: 'Latitudes and Longitudes' }],
                },
              ],
            },
          ],
        },
        {
          id: 'soc-c2',
          label: 'The French Revolution',
          children: [
            {
              id: 'soc-c2-t1',
              label: 'Social Structure',
              children: [
                {
                  id: 'soc-c2-t1-st1',
                  label: 'The Three Estates',
                  children: [{ id: 'soc-c2-t1-st1-con1', label: 'Causes of the Outbreak' }],
                },
              ],
            },
          ],
        },
        {
          id: 'soc-c3',
          label: 'What is Democracy?',
          children: [
            {
              id: 'soc-c3-t1',
              label: 'Arguments for Democracy',
              children: [
                {
                  id: 'soc-c3-t1-st1',
                  label: 'Democratic Decision Making',
                  children: [
                    { id: 'soc-c3-t1-st1-con1', label: 'Political Equality and Franchise' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'soc-c4',
          label: 'Poverty as a Challenge',
          children: [
            {
              id: 'soc-c4-t1',
              label: 'Vulnerability and Poverty Line',
              children: [
                {
                  id: 'soc-c4-t1-st1',
                  label: 'Anti-Poverty Measures',
                  children: [
                    {
                      id: 'soc-c4-t1-st1-con1',
                      label: 'Mahatma Gandhi National Rural Employment Guarantee Act',
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
