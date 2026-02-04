import { MIND_MAP_MOCK_DATA } from './learn-mind-map-mock.constant';
import type { LessonContent } from '../constants/mock-data.constant';

export const LESSON_CONTENTS_MOCK: Record<string, LessonContent> = {
  // Mathematics Lessons
  l1: {
    lessonId: 'l1',
    topics: [
      {
        id: 't1',
        title: 'The Chain Rule',
        content: `
### Understanding the Chain Rule

The chain rule is a formula to compute the derivative of a composite function. That is, if $f$ and $g$ are differentiable functions, then the chain rule expresses the derivative of their composition $f \\circ g$.

**Formula:**
If $y = f(u)$ and $u = g(x)$, then:
$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$

**Example:**
Find the derivative of $y = (3x^2 + 1)^2$.
1. Let $u = 3x^2 + 1$, so $y = u^2$.
2. $\\frac{dy}{du} = 2u$
3. $\\frac{du}{dx} = 6x$
4. Multiply: $2u \\cdot 6x = 12x(3x^2 + 1)$
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Implicit Differentiation',
        content: `
### Implicit Differentiation

In calculus, a method called **implicit differentiation** makes use of the chain rule to differentiate implicitly defined functions.

To differentiate an implicit function $y(x)$, defined by an equation $R(x,y) = 0$, it is not generally possible to solve it explicitly for $y$ and then differentiate. Instead, one can totally differentiate $R(x,y) = 0$ with respect to $x$ and then solve the resulting linear equation for $dy/dx$.
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ',
        text: 'What is the derivative of sin(x²)?',
        options: ['cos(x²)', '2x cos(x²)', '-sin(x²)', '2x sin(x)'],
        correctAnswer: 1,
        explanation:
          'Using the chain rule: d/dx(sin(u)) = cos(u) * du/dx. Here u = x², so du/dx = 2x.',
      },
      {
        id: 'q2',
        type: 'TRUE_FALSE',
        text: 'The derivative of a constant is always zero.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation:
          'A constant function represents a horizontal line, so its rate of change (slope) is always zero.',
      },
      {
        id: 'q3',
        type: 'WRITTEN',
        text: 'Explain the importance of the Chain Rule in complex differentiation.',
        explanation:
          'The Chain Rule allows us to break down complex composite functions into simpler ones for step-by-step differentiation.',
      },
    ],
    flashcards: [
      { id: 'f1', front: 'Chain Rule Formula', back: "d/dx[f(g(x))] = f'(g(x)) * g'(x)" },
      { id: 'f2', front: 'Derivative of e^x', back: 'e^x' },
      { id: 'f3', front: 'Derivative of ln(x)', back: '1/x' },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'Define the Product Rule.',
        answerShort: "The product rule finds derivatives of products: (fg)' = f'g + fg'.",
        answerMedium:
          'The product rule is a calculus formula used to find the derivatives of products of two or more functions.',
        answerLong:
          "The product rule is a fundamental formula in calculus used to find the derivatives of products of two or more functions. For two functions f and g, the derivative of their product is: d/dx[f(x)g(x)] = f(x)g'(x) + g(x)f'(x).",
      },
    ],
  },

  l4: {
    lessonId: 'l4',
    topics: [
      {
        id: 't1',
        title: 'Real Numbers and Irrational Numbers',
        content: `
### Understanding Real Numbers

Real numbers form the foundation of mathematics. They include all rational numbers (integers and fractions) and irrational numbers.

**Rational vs Irrational Numbers:**
- **Rational Numbers:** Can be expressed as p/q where p and q are integers
- **Irrational Numbers:** Cannot be expressed as a simple fraction (e.g., √2, π, e)

**Key Concepts:**
1. Decimal representation of irrational numbers is non-terminating and non-repeating
2. Irrational numbers are dense on the number line
3. The sum of rational and irrational is always irrational
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Number Systems and Operations',
        content: `
### Number System Properties

Real numbers satisfy various properties that are fundamental to algebra:

**Properties:**
- **Closure:** Sum and product of real numbers are real
- **Commutative:** a + b = b + a and ab = ba
- **Associative:** (a + b) + c = a + (b + c)
- **Distributive:** a(b + c) = ab + ac
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ',
        text: 'Which of the following is an irrational number?',
        options: ['1/2', '0.333...', '√2', '22/7'],
        correctAnswer: 2,
        explanation:
          '√2 cannot be expressed as a fraction and has non-terminating, non-repeating decimal representation.',
      },
      {
        id: 'q2',
        type: 'TRUE_FALSE',
        text: 'π is a rational number.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'π is an irrational number that cannot be expressed as a fraction of two integers.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Rational Number',
        back: 'A number that can be expressed as p/q where p, q are integers',
      },
      {
        id: 'f2',
        front: 'Irrational Number',
        back: 'A number that cannot be expressed as a fraction (e.g., √2, π)',
      },
      { id: 'f3', front: 'Real Numbers', back: 'Union of all rational and irrational numbers' },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What are irrational numbers?',
        answerShort:
          'Numbers that cannot be expressed as fractions and have non-repeating decimals.',
        answerMedium:
          'Irrational numbers are real numbers that cannot be expressed as the ratio of two integers. Their decimal representations are infinite and non-repeating.',
        answerLong:
          'Irrational numbers form an important subset of the real numbers. These are numbers that cannot be written in the form p/q where p and q are integers. Common examples include √2, √3, π, and e. A key characteristic is that their decimal representations never terminate and never repeat. Irrational numbers are dense on the number line, meaning between any two rational numbers, there exists an irrational number.',
      },
    ],
  },

  l5: {
    lessonId: 'l5',
    topics: [
      {
        id: 't1',
        title: 'Polynomial Factorisation Techniques',
        content: `
### Methods for Factoring Polynomials

Factorization is the process of expressing a polynomial as a product of simpler polynomials.

**Common Techniques:**
1. **Factor out GCF:** Find the greatest common factor
2. **Grouping:** Group terms and factor common factors
3. **Difference of Squares:** $a^2 - b^2 = (a+b)(a-b)$
4. **Trinomial Factoring:** $ax^2 + bx + c = a(x - r_1)(x - r_2)$

**Remainder Theorem:** If polynomial P(x) is divided by (x - a), the remainder is P(a).
**Factor Theorem:** (x - a) is a factor of P(x) if and only if P(a) = 0.
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Polynomial Division',
        content: `
### Understanding Polynomial Division

Polynomial division is similar to long division with numbers but applied to polynomials.

**Methods:**
- **Long Division:** Step-by-step division process
- **Synthetic Division:** Faster method for division by linear polynomials
- **Horner\'s Method:** Efficient evaluation technique
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ',
        text: 'Factorize: x² - 9',
        options: ['(x-3)(x-3)', '(x+3)(x-3)', '(x+3)(x+3)', '(x-9)(x+1)'],
        correctAnswer: 1,
        explanation: 'x² - 9 is a difference of squares: x² - 3² = (x + 3)(x - 3)',
      },
    ],
    flashcards: [
      { id: 'f1', front: 'Difference of Squares', back: '$a^2 - b^2 = (a+b)(a-b)$' },
      {
        id: 'f2',
        front: 'Remainder Theorem',
        back: 'Remainder when P(x) is divided by (x-a) is P(a)',
      },
      { id: 'f3', front: 'Factor Theorem', back: '(x-a) is a factor of P(x) ⟺ P(a) = 0' },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the remainder theorem?',
        answerShort: 'When a polynomial P(x) is divided by (x-a), the remainder equals P(a).',
        answerMedium:
          'The Remainder Theorem states that when a polynomial P(x) is divided by a linear polynomial (x - a), the remainder is equal to P(a).',
        answerLong:
          'The Remainder Theorem is a key result in algebra. It states: If a polynomial P(x) is divided by (x - a), then the remainder is P(a). This theorem is useful because it allows us to find remainders without performing long division. Additionally, if the remainder is 0, then (x - a) is a factor of P(x), which connects to the Factor Theorem.',
      },
    ],
  },

  l6: {
    lessonId: 'l6',
    topics: [
      {
        id: 't1',
        title: 'Triangle Congruency Criteria',
        content: `
### Congruent Triangles

Two triangles are congruent if they have the same shape and size.

**Congruency Criteria:**
1. **SSS (Side-Side-Side):** All three sides are equal
2. **SAS (Side-Angle-Side):** Two sides and included angle are equal
3. **ASA (Angle-Side-Angle):** Two angles and included side are equal
4. **AAS (Angle-Angle-Side):** Two angles and a non-included side are equal
5. **RHS (Right angle-Hypotenuse-Side):** For right triangles, hypotenuse and one side are equal

**Properties of Congruent Triangles:**
- Corresponding sides are equal
- Corresponding angles are equal
- Corresponding medians, altitudes, and angle bisectors are equal
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Applications of Congruency',
        content: `
### Using Congruency to Prove Theorems

Congruent triangles are fundamental in geometric proofs.

**Common Applications:**
- Proving that segments are equal
- Proving that angles are equal
- Establishing symmetry properties
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ',
        text: 'Which criterion proves two triangles are congruent if two sides and the included angle are equal?',
        options: ['SSS', 'SAS', 'ASA', 'RHS'],
        correctAnswer: 1,
        explanation:
          'SAS (Side-Angle-Side) is used when two sides and the included angle are equal.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'SSS Criterion',
        back: 'All three sides of one triangle equal to corresponding sides of another',
      },
      {
        id: 'f2',
        front: 'SAS Criterion',
        back: 'Two sides and included angle of one triangle equal to another',
      },
      {
        id: 'f3',
        front: 'RHS Criterion',
        back: 'For right triangles: hypotenuse and one side are equal',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the SSS congruency criterion?',
        answerShort:
          'If all three sides of one triangle equal the three sides of another triangle, the triangles are congruent.',
        answerMedium:
          'The SSS (Side-Side-Side) criterion states that if three sides of one triangle are congruent to three sides of another triangle, then the two triangles are congruent.',
        answerLong:
          'The Side-Side-Side (SSS) congruency criterion is one of the fundamental ways to prove that two triangles are congruent. It states: If three sides of one triangle are congruent to the corresponding three sides of another triangle, then the triangles are congruent. This criterion is intuitive because once all three side lengths are fixed, the shape and size of the triangle are completely determined.',
      },
    ],
  },

  l7: {
    lessonId: 'l7',
    topics: [
      {
        id: 't1',
        title: 'Properties of Quadrilaterals',
        content: `
### Understanding Quadrilaterals

A quadrilateral is a polygon with four sides, four vertices, and four angles.

**Properties:**
- Sum of interior angles = 360°
- **Parallelogram:** Opposite sides are parallel and equal
- **Rectangle:** All angles are 90°, opposite sides are equal
- **Square:** All sides and angles are equal
- **Rhombus:** All sides are equal, opposite angles are equal
- **Trapezium:** One pair of opposite sides is parallel

**Diagonal Properties:**
- Diagonals of a parallelogram bisect each other
- Diagonals of a rectangle are equal and bisect each other
- Diagonals of a square are equal, bisect each other at 90°
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Parallelogram Theorems',
        content: `
### Key Theorems About Parallelograms

Several important theorems help us understand and work with parallelograms.

**Theorem 1:** In a parallelogram, opposite sides are equal.
**Theorem 2:** In a parallelogram, opposite angles are equal.
**Theorem 3:** Diagonals of a parallelogram bisect each other.
**Theorem 4:** If diagonals of a quadrilateral bisect each other, it is a parallelogram.
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'In a parallelogram, which statement is true?',
        options: [
          'All angles are equal',
          'Opposite sides are equal',
          'Diagonals are equal',
          'All sides are equal',
        ],
        correctAnswer: 1,
        explanation: 'In a parallelogram, opposite sides are equal and parallel.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Parallelogram',
        back: 'Quadrilateral with opposite sides parallel and equal',
      },
      {
        id: 'f2',
        front: 'Diagonal Bisection',
        back: 'Diagonals of a parallelogram bisect each other',
      },
      {
        id: 'f3',
        front: 'Sum of Angles',
        back: 'Sum of interior angles of any quadrilateral is 360°',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What are the properties of a parallelogram?',
        answerShort:
          'Opposite sides are equal and parallel; opposite angles are equal; diagonals bisect each other.',
        answerMedium:
          'A parallelogram is a quadrilateral where opposite sides are parallel. Key properties include: opposite sides are equal, opposite angles are equal, consecutive angles are supplementary, and diagonals bisect each other.',
        answerLong:
          'A parallelogram has several important properties: 1) Opposite sides are equal in length and parallel, 2) Opposite angles are equal, 3) Consecutive (adjacent) angles are supplementary (sum to 180°), 4) Diagonals bisect each other (cut each other into equal halves), 5) Each diagonal divides the parallelogram into two congruent triangles. These properties are crucial for solving problems involving parallelograms and are used extensively in geometric proofs.',
      },
    ],
  },

  // Science Lessons
  l2: {
    lessonId: 'l2',
    topics: [
      {
        id: 't1',
        title: 'Describing Motion with Equations',
        content: `
### Equations of Motion

The equations of motion describe the relationship between displacement, velocity, acceleration, and time.

**The Three Equations:**
1. $v = u + at$
2. $s = ut + \\frac{1}{2}at^2$
3. $v^2 = u^2 + 2as$

Where:
- $u$ = initial velocity
- $v$ = final velocity
- $a$ = acceleration
- $t$ = time
- $s$ = displacement

**Derivation by Graphical Method:**
These equations can be derived using velocity-time (v-t) graphs:
- The area under the v-t graph gives displacement
- The slope of the v-t graph gives acceleration
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Applications of Motion Equations',
        content: `
### Solving Motion Problems

These equations help solve real-world motion problems involving:
- Objects falling under gravity
- Vehicles accelerating or decelerating
- Projectile motion

**Problem-Solving Strategy:**
1. Identify known and unknown quantities
2. Choose appropriate equation(s)
3. Substitute values carefully (watch units!)
4. Solve for the unknown
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'An object starts from rest and accelerates at 2 m/s² for 5 seconds. What is its final velocity?',
        options: ['5 m/s', '10 m/s', '15 m/s', '20 m/s'],
        correctAnswer: 1,
        explanation: 'Using v = u + at, where u = 0, a = 2, t = 5: v = 0 + 2(5) = 10 m/s',
      },
    ],
    flashcards: [
      { id: 'f1', front: 'Equation 1', back: '$v = u + at$' },
      { id: 'f2', front: 'Equation 2', back: '$s = ut + \\frac{1}{2}at^2$' },
      { id: 'f3', front: 'Equation 3', back: '$v^2 = u^2 + 2as$' },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the first equation of motion?',
        answerShort:
          'v = u + at, where v is final velocity, u is initial velocity, a is acceleration, and t is time.',
        answerMedium:
          'The first equation of motion (v = u + at) relates velocity to time. It shows that final velocity equals initial velocity plus the product of acceleration and time.',
        answerLong:
          'The first equation of motion, v = u + at, is derived from the definition of acceleration. It states that the final velocity of an object is equal to its initial velocity plus the acceleration multiplied by the time elapsed. This equation is useful when you need to find the final velocity of an object or the time taken to reach a certain velocity.',
      },
    ],
  },

  l8: {
    lessonId: 'l8',
    topics: [
      {
        id: 't1',
        title: 'Atomic and Molecular Structure',
        content: `
### Atoms and Molecules: Fundamental Concepts

Understanding the structure of matter is crucial in chemistry.

**Atomic Structure:**
- Nucleus: Contains protons (+ve) and neutrons (neutral)
- Electron cloud: Contains electrons (-ve) orbiting the nucleus
- Atomic number: Number of protons in an atom
- Mass number: Total protons + neutrons

**Laws of Chemical Combination:**
1. **Law of Conservation of Mass:** Matter is neither created nor destroyed
2. **Law of Definite Proportions:** Compounds always contain elements in the same ratio
3. **Law of Multiple Proportions:** Elements combine in simple whole number ratios
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: "Mole Concept and Avogadro's Number",
        content: `
### The Mole: A Chemist's Tool

The mole is a fundamental unit in chemistry that bridges atomic scale to macroscopic quantities.

**Key Concepts:**
- **Mole:** Amount of substance containing Avogadro's number of particles
- **Avogadro's Number:** $N_A = 6.022 × 10^{23}$ particles/mol
- **Molar Mass:** Mass of one mole of a substance (g/mol)
- **Relationship:** Number of moles = mass ÷ molar mass

**Applications:**
- Converting between grams and moles
- Calculating number of atoms/molecules
- Stoichiometric calculations
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: "What is Avogadro's number?",
        options: ['$3.14 × 10^{23}$', '$6.022 × 10^{23}$', '$1.6 × 10^{-19}$', '$9.8$'],
        correctAnswer: 1,
        explanation:
          "Avogadro's number is $6.022 × 10^{23}$, representing the number of particles in one mole.",
      },
    ],
    flashcards: [
      { id: 'f1', front: "Avogadro's Number", back: '$6.022 × 10^{23}$ particles per mole' },
      {
        id: 'f2',
        front: 'Mole',
        back: "Unit of amount of substance, equal to Avogadro's number of particles",
      },
      { id: 'f3', front: 'Molar Mass', back: 'Mass in grams of one mole of a substance' },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the mole concept?',
        answerShort:
          'The mole is a unit that represents $6.022 × 10^{23}$ particles of a substance.',
        answerMedium:
          "The mole concept is a way to quantify the amount of substance. One mole of any substance contains Avogadro's number ($6.022 × 10^{23}$) of particles (atoms, molecules, or ions).",
        answerLong:
          "The mole is one of the most important concepts in chemistry. It provides a bridge between the atomic scale (where individual atoms and molecules are incredibly small) and the laboratory scale where we measure out grams of material. By definition, one mole of any substance contains exactly Avogadro's number ($6.022 × 10^{23}$) of particles. This makes it easy to convert between the number of atoms/molecules and the mass of a substance using molar mass.",
      },
    ],
  },

  l9: {
    lessonId: 'l9',
    topics: [
      {
        id: 't1',
        title: 'Cell Structure and Functions',
        content: `
### The Fundamental Unit of Life: The Cell

Cells are the basic structural and functional units of all living organisms.

**Cell Structure Components:**
- **Nucleus:** Contains genetic material (DNA), controls cell functions
- **Mitochondria:** Powerhouse of the cell, produces energy (ATP)
- **Ribosomes:** Site of protein synthesis
- **Endoplasmic Reticulum:** Network for transport and protein synthesis
- **Golgi Apparatus:** Modifies and packages proteins
- **Lysosomes:** Contain digestive enzymes

**Prokaryotic vs Eukaryotic Cells:**
- **Prokaryotes:** No nucleus or membrane-bound organelles (bacteria, archaea)
- **Eukaryotes:** Have nucleus and membrane-bound organelles (plants, animals, fungi)
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Cell Division: Mitosis and Meiosis',
        content: `
### Understanding Cell Division

Cell division is essential for growth, repair, and reproduction.

**Mitosis (Equational Division):**
- Produces two identical daughter cells
- Each has the same number of chromosomes as parent
- Used for growth and asexual reproduction
- Stages: Prophase, Metaphase, Anaphase, Telophase

**Meiosis (Reduction Division):**
- Produces four genetically different cells
- Each has half the chromosomes of parent (haploid)
- Used for sexual reproduction
- Two divisions: Meiosis I and Meiosis II
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'Which organelle is known as the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome'],
        correctAnswer: 1,
        explanation:
          'Mitochondria produces energy (ATP) for cellular functions, earning it the title "powerhouse of the cell".',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Nucleus',
        back: 'Membrane-bound organelle containing DNA and controlling cell functions',
      },
      {
        id: 'f2',
        front: 'Mitochondria',
        back: 'Organelle responsible for energy production (ATP synthesis)',
      },
      {
        id: 'f3',
        front: 'Ribosomes',
        back: 'Site of protein synthesis, can be free or attached to endoplasmic reticulum',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the difference between mitosis and meiosis?',
        answerShort:
          'Mitosis produces two identical diploid cells; meiosis produces four different haploid cells.',
        answerMedium:
          'Mitosis is equational division producing two genetically identical daughter cells with the same chromosome number. Meiosis is reduction division producing four genetically different cells with half the chromosome number.',
        answerLong:
          'Mitosis and meiosis are two different types of cell division with different purposes and outcomes. Mitosis produces two daughter cells that are genetically identical to each other and to the parent cell. All cells have the same chromosome number (diploid in animals). Mitosis is used for growth, repair, and asexual reproduction. Meiosis, on the other hand, produces four genetically different haploid cells (half the chromosome number). It involves two divisions and results in cells with half the genetic material. Meiosis is specific to sexual reproduction and produces gametes (sperm and eggs).',
      },
    ],
  },

  l10: {
    lessonId: 'l10',
    topics: [
      {
        id: 't1',
        title: 'Photosynthesis Process',
        content: `
### Photosynthesis: Converting Light to Energy

Photosynthesis is the process by which plants convert light energy into chemical energy.

**Overall Reaction:**
$6CO_2 + 6H_2O + \\text{light} \\rightarrow C_6H_{12}O_6 + 6O_2$

**Structure of Chloroplast:**
- **Outer Membrane:** Protective boundary
- **Inner Membrane:** Controls substance entry/exit
- **Thylakoids:** Flattened sacs stacked as grana, site of light reactions
- **Stroma:** Fluid-filled space where dark reactions occur
- **Chlorophyll:** Pigment that absorbs light energy

**Chlorophyll Types:**
- **Chlorophyll a:** Primary photosynthetic pigment
- **Chlorophyll b:** Accessory pigment
- **Carotenoids:** Yellow and orange pigments
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Light-Dependent and Light-Independent Reactions',
        content: `
### The Two Stages of Photosynthesis

**Light-Dependent Reactions (Light Reactions):**
- Occur in thylakoid membranes
- Require light energy
- Produce ATP and NADPH
- Split water molecules, releasing oxygen
- Energy-capturing phase

**Light-Independent Reactions (Calvin Cycle):**
- Occur in the stroma
- Do not directly require light (but use ATP and NADPH from light reactions)
- Fix CO₂ into glucose
- Energy-utilization phase

**Energy Transfer:**
Light Energy → Chemical Energy (ATP) → Glucose (stored energy)
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'Where do the light-dependent reactions of photosynthesis occur?',
        options: ['Stroma', 'Thylakoid membranes', 'Nucleus', 'Mitochondria'],
        correctAnswer: 1,
        explanation:
          'Light-dependent reactions occur in the thylakoid membranes where chlorophyll absorbs light energy.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Photosynthesis Equation',
        back: '$6CO_2 + 6H_2O + \\text{light} \\rightarrow C_6H_{12}O_6 + 6O_2$',
      },
      {
        id: 'f2',
        front: 'Thylakoid',
        back: 'Flattened sac in chloroplast where light reactions occur',
      },
      {
        id: 'f3',
        front: 'Chlorophyll',
        back: 'Green pigment that absorbs light energy in photosynthesis',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the Calvin Cycle?',
        answerShort:
          'The Calvin Cycle is the light-independent reaction that fixes CO₂ into glucose using ATP and NADPH.',
        answerMedium:
          'The Calvin Cycle, also called the dark reactions or light-independent reactions, occurs in the stroma and uses the ATP and NADPH produced by the light reactions to fix carbon dioxide into glucose.',
        answerLong:
          'The Calvin Cycle is the second major stage of photosynthesis that occurs in the stroma of chloroplasts. Unlike the light-dependent reactions, the Calvin Cycle does not directly require light (though it depends on products from light reactions). The cycle uses ATP and NADPH produced by light reactions to fix CO₂ from the atmosphere into glucose. The cycle involves three main phases: carbon fixation, reduction, and regeneration of RuBP. The Calvin Cycle is also known as the dark reactions because it does not directly use light energy.',
      },
    ],
  },

  // English Lessons
  l11: {
    lessonId: 'l11',
    topics: [
      {
        id: 't1',
        title: 'The Fun They Had: Story Overview',
        content: `
### Literature: The Fun They Had

"The Fun They Had" is a science fiction short story that explores the evolution of education.

**Plot Summary:**
The story is set in a future where education is done entirely through mechanical teachers in private rooms. Two children, Margie and Tommy, discover an old mechanical book and become fascinated by it. Through conversation with her mother, Margie learns about how learning was done in the past with human teachers in schools.

**Key Themes:**
- Technology vs Human Connection
- Evolution of Education
- Loss and Nostalgia
- The Value of Traditional Learning

**Main Characters:**
- **Margie:** Young girl attending mechanical school
- **Tommy:** Her friend
- **Mother:** Explains the old education system
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Technology in Education',
        content: `
### Comparing Mechanical Teacher with Human Teacher

**Mechanical Teacher Features:**
- Customized learning pace
- Consistent instruction
- No judgment or favoritism
- Available anytime

**Human Teacher Advantages:**
- Personal interaction
- Emotional connection
- Adaptability
- Inspiration and motivation
- Social development through classroom interaction

**The Author's Message:**
The story questions whether efficiency and convenience should replace the human element in education.
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'In "The Fun They Had," what does Margie find that interests her?',
        options: [
          'A new mechanical teacher',
          'An old paper book',
          'A computer',
          'A school building',
        ],
        correctAnswer: 1,
        explanation: 'Margie discovers an old mechanical book that fascinates her and Tommy.',
      },
    ],
    flashcards: [
      { id: 'f1', front: 'Author', back: 'Isaac Asimov' },
      { id: 'f2', front: 'Setting', back: 'Future with mechanical teachers in homes' },
      { id: 'f3', front: 'Main Theme', back: 'Technology vs human connection in education' },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the main theme of "The Fun They Had"?',
        answerShort:
          'The story explores the contrast between mechanical education and traditional human teaching.',
        answerMedium:
          'The main theme examines how technology has replaced human interaction in education and questions whether this progress is truly beneficial.',
        answerLong:
          '"The Fun They Had" presents a thought-provoking comparison between two educational systems. In the future depicted, students learn from mechanical teachers in isolation, while the past had human teachers and school buildings where students learned together. Through the children\'s curiosity about old books and schools, the author questions the loss of the social and emotional aspects of traditional education. The story suggests that while mechanical teachers are efficient and personalized, they lack the human connection, inspiration, and social development that come from traditional classroom settings.',
      },
    ],
  },

  l12: {
    lessonId: 'l12',
    topics: [
      {
        id: 't1',
        title: 'Present and Past Perfect Tenses',
        content: `
### Understanding Perfect Tenses

Perfect tenses describe actions that are completed at a specific time point.

**Present Perfect Tense:**
- **Form:** Have/Has + Past Participle
- **Use:** Action completed at an unspecified time in the past; ongoing effect in present
- **Examples:** 
  - "I have finished my homework"
  - "She has lived here for 5 years"
- **Signal Words:** Just, already, yet, ever, never, recently

**Past Perfect Tense:**
- **Form:** Had + Past Participle
- **Use:** Action completed before another past action
- **Examples:**
  - "By the time he arrived, I had finished eating"
  - "She had studied for three hours before the exam"
- **Signal Words:** Before, after, already, just, by the time, when
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Sequence of Tenses in Complex Sentences',
        content: `
### Maintaining Tense Consistency

Sequence of tenses refers to the relationship between tenses in complex sentences.

**Rules:**
1. **Main Clause in Present:** Dependent clause can be in any tense that makes sense
   - "I know that she studies hard" (both present)
   - "I know that she studied hard" (fact about past)

2. **Main Clause in Past:** Dependent clause should generally be in past
   - "I knew that she had studied" (past perfect for prior action)
   - "She said that she would come" (future from past perspective)

3. **Reported Speech:** Changes tense one step backward
   - Direct: "I am tired"
   - Reported: "He said he was tired"
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ',
        text: 'Which sentence uses the present perfect tense correctly?',
        options: [
          'I finished my work yesterday',
          'I have finished my work',
          'I will finish my work',
          'I finished work every day',
        ],
        correctAnswer: 1,
        explanation:
          '"I have finished my work" correctly uses the present perfect tense (have + past participle).',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Present Perfect',
        back: 'Have/Has + Past Participle - action completed with present relevance',
      },
      {
        id: 'f2',
        front: 'Past Perfect',
        back: 'Had + Past Participle - action completed before another past action',
      },
      {
        id: 'f3',
        front: 'Signal Words for Past Perfect',
        back: 'Before, after, already, just, by the time, when',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'Explain the difference between simple past and present perfect.',
        answerShort:
          'Simple past describes completed actions at a specific time; present perfect describes completed actions with ongoing relevance.',
        answerMedium:
          'Simple past is used for actions completed at a definite time in the past. Present perfect is used for actions completed at an unspecified time with relevance to the present.',
        answerLong:
          'The simple past and present perfect are both used for completed actions, but with different emphases. Simple past (I studied for two hours yesterday) focuses on a specific time in the past; the action is finished and has no connection to now. Present perfect (I have studied for many years) emphasizes the relevance to the present; it shows an action that started in the past and continues to affect the present, or a recent action with present importance. The choice depends on whether you want to emphasize when the action happened (simple past) or its relevance to the present moment (present perfect).',
      },
    ],
  },

  l13: {
    lessonId: 'l13',
    topics: [
      {
        id: 't1',
        title: 'Active and Passive Voice Transformation',
        content: `
### Understanding Active and Passive Voice

**Active Voice:**
- Subject performs the action
- Structure: Subject + Verb + Object
- Example: "The teacher explains the lesson"

**Passive Voice:**
- Subject receives the action
- Structure: Subject + Form of "to be" + Past Participle (+ by + agent)
- Example: "The lesson is explained by the teacher"

**Converting Active to Passive:**
1. Move object to subject position
2. Use appropriate form of "to be"
3. Change main verb to past participle
4. Put original subject after "by" (optional)

**Active:** "Students completed the project"
**Passive:** "The project was completed by students"
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Passive Voice in Imperative Sentences',
        content: `
### Imperative Passive Voice

While less common, passive voice can be used in imperative sentences.

**Structure:** Let + Object + Be + Past Participle

**Examples:**
- Active Imperative: "Listen to the teacher carefully"
- Passive Imperative: "Let the teacher be listened to carefully"
- Active Imperative: "Close the door"
- Passive Imperative: "Let the door be closed"

**When to Use:**
- Formal or polite instructions
- When focus is on the action rather than the doer
- In written rules and guidelines
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ',
        text: 'Change to passive: "The artist painted the mural"',
        options: [
          'The mural painted the artist',
          'The mural was painted by the artist',
          'The artist was painting the mural',
          'Painting was the mural',
        ],
        correctAnswer: 1,
        explanation:
          'Passive voice: Subject receives action. "The mural was painted by the artist" is the correct passive form.',
      },"},{"explanation":"Change MCQ at conjunction identification","filePath":"c:\\Users\\Divya S\\Aile\\web\\src\\app\\shared\\mocks\\lesson-contents-mock.constant.ts","oldString":"      {\n        id: 'q1',\n        type: QuestionType.MCQ,\n        text: 'Identify the conjunction in the sentence: \"She likes to read books and watch movies\"',\n        options: ['likes', 'to', 'and', 'watch'],\n        correctAnswer: 2,\n        explanation:\n          '"And" is the conjunction connecting two activities (read books and watch movies).',\n      },","newString":"      {\n        id: 'q1',\n        type: 'MCQ',\n        text: 'Identify the conjunction in the sentence: \"She likes to read books and watch movies\"',\n        options: ['likes', 'to', 'and', 'watch'],\n        correctAnswer: 2,\n        explanation:\n          '"And" is the conjunction connecting two activities (read books and watch movies).',\n      },"},{"explanation":"Change MCQ at latitude question","filePath":"c:\\Users\\Divya S\\Aile\\web\\src\\app\\shared\\mocks\\lesson-contents-mock.constant.ts","oldString":"      {\n        id: 'q1',\n        type: QuestionType.MCQ,\n        text: 'Which line of latitude divides Earth into Northern and Southern hemispheres?',\n        options: ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'Arctic Circle'],\n        correctAnswer: 1,\n        explanation:\n          'The Equator (0° latitude) divides Earth into the Northern and Southern hemispheres.',\n      },","newString":"      {\n        id: 'q1',\n        type: 'MCQ',\n        text: 'Which line of latitude divides Earth into Northern and Southern hemispheres?',\n        options: ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'Arctic Circle'],\n        correctAnswer: 1,\n        explanation:\n          'The Equator (0° latitude) divides Earth into the Northern and Southern hemispheres.',\n      },"},{"explanation":"Change MCQ at democracy question","filePath":"c:\\Users\\Divya S\\Aile\\web\\src\\app\\shared\\mocks\\lesson-contents-mock.constant.ts","oldString":"      {\n        id: 'q1',\n        type: QuestionType.MCQ,\n        text: 'Which is a key principle of democracy?',\n        options: [\n          'Absolute authority of one person',\n          'Political equality of all citizens',\n          'Power held by the wealthy',\n          'Military rule',\n        ],\n        correctAnswer: 1,\n        explanation:","newString":"      {\n        id: 'q1',\n        type: 'MCQ',\n        text: 'Which is a key principle of democracy?',\n        options: [\n          'Absolute authority of one person',\n          'Political equality of all citizens',\n          'Power held by the wealthy',\n          'Military rule',\n        ],\n        correctAnswer: 1,\n        explanation:"},{"explanation":"Change MCQ at MGNREGA question","filePath":"c:\\Users\\Divya S\\Aile\\web\\src\\app\\shared\\mocks\\lesson-contents-mock.constant.ts","oldString":"      {\n        id: 'q1',\n        type: QuestionType.MCQ,\n        text: 'What does MGNREGA guarantee?',\n        options: [\n          'Free education',\n          '100 days of employment per year',\n          'Health insurance',\n          'Land ownership',\n        ],\n        correctAnswer: 1,\n        explanation:\n          'MGNREGA guarantees 100 days of employment per year to rural households as an anti-poverty measure.',\n      },","newString":"      {\n        id: 'q1',\n        type: 'MCQ',\n        text: 'What does MGNREGA guarantee?',\n        options: [\n          'Free education',\n          '100 days of employment per year',\n          'Health insurance',\n          'Land ownership',\n        ],\n        correctAnswer: 1,\n        explanation:\n          'MGNREGA guarantees 100 days of employment per year to rural households as an anti-poverty measure.',\n      },"},{"explanation":"Change MCQ at cell cycle question","filePath":"c:\\Users\\Divya S\\Aile\\web\\src\\app\\shared\\mocks\\lesson-contents-mock.constant.ts","oldString":"      {\n        id: 'q1',\n        type: QuestionType.MCQ,\n        text: 'During which phase does DNA replication occur?',\n        options: ['G1 Phase', 'S Phase', 'G2 Phase', 'M Phase'],\n        correctAnswer: 1,\n        explanation: 'DNA replication occurs during the S (Synthesis) Phase of the cell cycle.',\n      },","newString":"      {\n        id: 'q1',\n        type: 'MCQ',\n        text: 'During which phase does DNA replication occur?',\n        options: ['G1 Phase', 'S Phase', 'G2 Phase', 'M Phase'],\n        correctAnswer: 1,\n        explanation: 'DNA replication occurs during the S (Synthesis) Phase of the cell cycle.',\n      },"},{"explanation":"Change MCQ at chlorophyll question","filePath":"c:\\Users\\Divya S\\Aile\\web\\src\\app\\shared\\mocks\\lesson-contents-mock.constant.ts","oldString":"      {\n        id: 'q1',\n        type: QuestionType.MCQ,\n        text: 'What is the primary function of chlorophyll in photosynthesis?',\n        options: ['Store glucose', 'Absorb light energy', 'Transport water', 'Release oxygen'],\n        correctAnswer: 1,\n        explanation:\n          'Chlorophyll absorbs light energy, which is the first critical step in photosynthesis.',\n      },","newString":"      {\n        id: 'q1',\n        type: 'MCQ',\n        text: 'What is the primary function of chlorophyll in photosynthesis?',\n        options: ['Store glucose', 'Absorb light energy', 'Transport water', 'Release oxygen'],\n        correctAnswer: 1,\n        explanation:\n          'Chlorophyll absorbs light energy, which is the first critical step in photosynthesis.',\n      },"}]}### End JSON
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Active Voice',
        back: 'Subject performs the action: Subject + Verb + Object',
      },
      {
        id: 'f2',
        front: 'Passive Voice',
        back: 'Subject receives the action: Subject + to be + Past Participle',
      },
      {
        id: 'f3',
        front: 'Conversion Rule',
        back: 'Move object to front, use "to be" + past participle, agent after "by"',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'When should you use passive voice?',
        answerShort:
          'When the action is more important than the doer, or when the doer is unknown.',
        answerMedium:
          'Use passive voice when emphasis is on the action or result rather than who performs it, when the doer is unknown, or for formal tone.',
        answerLong:
          'Passive voice is useful in several situations. First, when the action or result is more important than who performs it: "The bridge was completed in 2020" (focus on the bridge and completion date). Second, when the doer is unknown or obvious: "The window was broken" (we don\'t know or don\'t need to say who broke it). Third, in formal or scientific writing where objective tone is desired: "The experiment was conducted under controlled conditions." However, active voice is generally preferred as it\'s clearer and more direct. Use passive voice judiciously for emphasis or clarity.',
      },
    ],
  },

  l14: {
    lessonId: 'l14',
    topics: [
      {
        id: 't1',
        title: 'Word Classes: Parts of Speech',
        content: `
### Understanding Parts of Speech

**Noun:** Person, place, thing, or idea
- Examples: teacher, school, happiness, dog

**Verb:** Action or state of being
- Examples: run, is, think, exist

**Adjective:** Describes nouns
- Examples: beautiful, tall, red, happy

**Adverb:** Describes verbs, adjectives, or other adverbs (usually ends in -ly)
- Examples: quickly, very, really, slowly

**Pronoun:** Replaces nouns
- Examples: he, she, it, they, who

**Preposition:** Shows relationship between words
- Examples: in, on, at, between, under

**Conjunction:** Joins words or clauses
- Examples: and, but, or, because, when

**Interjection:** Expresses emotion or surprise
- Examples: Oh!, Wow!, Alas!, Well!
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Usage of Correlative Conjunctions',
        content: `
### Correlative Conjunctions

Correlative conjunctions work in pairs to connect equal grammatical elements.

**Common Pairs:**
- **Either...or:** "You can either study now or study later"
- **Neither...nor:** "Neither Mary nor John attended the meeting"
- **Both...and:** "Both reading and writing are important skills"
- **Not only...but also:** "Not only is she intelligent, but she is also kind"
- **As...as:** "This book is as interesting as that one"
- **If...then:** "If you study hard, then you will succeed"

**Rules for Use:**
1. Correlative conjunctions must be placed as close as possible to the words they connect
2. Words following each conjunction should be parallel in structure
3. "Neither...nor" takes singular verb if both subjects are singular
4. "Either...or" takes singular verb when both subjects are singular
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'Identify the conjunction in the sentence: "She likes to read books and watch movies"',
        options: ['likes', 'to', 'and', 'watch'],
        correctAnswer: 2,
        explanation:
          '"And" is the conjunction connecting two activities (read books and watch movies).',
      },
    ],
    flashcards: [
      { id: 'f1', front: 'Noun', back: 'Word that represents a person, place, thing, or idea' },
      { id: 'f2', front: 'Verb', back: 'Word that expresses action or state of being' },
      {
        id: 'f3',
        front: 'Correlative Conjunctions',
        back: 'Pairs like either...or, neither...nor, both...and',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What are correlative conjunctions?',
        answerShort: 'Conjunctions that work in pairs to connect equal grammatical elements.',
        answerMedium:
          'Correlative conjunctions are pairs of words that work together to join words or phrases of equal grammatical rank.',
        answerLong:
          'Correlative conjunctions are conjunctions that work in pairs to connect grammatically equal elements. Common pairs include either...or, neither...nor, both...and, and not only...but also. When using these pairs, it\'s important to maintain parallel structure (same grammatical form) on both sides of the conjunction pair. For example: "She not only speaks English but also speaks Spanish" (both clauses have the same structure). These paired conjunctions provide emphasis and create a more balanced sentence structure than using a single conjunction.',
      },
    ],
  },

  // Social Studies Lessons
  l15: {
    lessonId: 'l15',
    topics: [
      {
        id: 't1',
        title: 'Evolution of Earth and Its Geography',
        content: `
### Our Earth: Formation and Development

Understanding Earth's structure helps us comprehend geography and natural phenomena.

**Earth's Structure:**
- **Crust:** Thin outer layer where we live (oceanic and continental)
- **Mantle:** Thick layer beneath the crust (hot rock)
- **Core:** Center of Earth (inner solid, outer liquid)

**Plate Tectonics:**
- Earth's crust is divided into plates
- Plates move slowly over time
- Movement causes earthquakes, volcanoes, and mountain formation

**Geological Time Periods:**
- Precambrian Era: Formation of Earth (4.6 billion years ago)
- Paleozoic Era: Early life forms emerge
- Mesozoic Era: Dinosaurs dominate
- Cenozoic Era: Mammals and humans emerge (recent)
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Latitude, Longitude, and the Grid System',
        content: `
### Locating Places: Latitude and Longitude

The grid system helps us locate any point on Earth.

**Latitude:**
- Imaginary lines running east-west
- Measured in degrees from Equator (0° to 90°)
- North latitude: Northern Hemisphere
- South latitude: Southern Hemisphere
- Constant latitude creates zones (tropical, temperate, polar)

**Longitude:**
- Imaginary lines running north-south
- Measured from Prime Meridian (0°)
- Western and Eastern hemispheres
- All meridians meet at the poles

**Significance:**
- Determines climate and time zones
- Essential for navigation
- Helps understand geographical distribution of resources
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'Which line of latitude divides Earth into Northern and Southern hemispheres?',
        options: ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'Arctic Circle'],
        correctAnswer: 1,
        explanation:
          'The Equator (0° latitude) divides Earth into the Northern and Southern hemispheres.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Latitude',
        back: 'Imaginary lines running east-west, measured from Equator (0° to 90°)',
      },
      {
        id: 'f2',
        front: 'Longitude',
        back: 'Imaginary lines running north-south, measured from Prime Meridian (0°)',
      },
      {
        id: 'f3',
        front: 'Equator',
        back: '0° latitude, divides Earth into Northern and Southern hemispheres',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the difference between latitude and longitude?',
        answerShort:
          'Latitude runs east-west from equator; longitude runs north-south from prime meridian.',
        answerMedium:
          'Latitude measures distance north or south of the equator in degrees. Longitude measures distance east or west of the prime meridian in degrees.',
        answerLong:
          'Latitude and longitude form the geographic coordinate system that allows us to locate any point on Earth. Latitude is measured from the Equator, which is at 0°, to the North Pole (90°N) and South Pole (90°S). Lines of constant latitude run east-west and are called parallels. They help determine climate zones. Longitude is measured from the Prime Meridian at 0°, extending 180° east and 180° west. Lines of constant longitude run north-south and are called meridians. Together, latitude and longitude create a grid that enables precise location identification on Earth.',
      },
    ],
  },

  l16: {
    lessonId: 'l16',
    topics: [
      {
        id: 't1',
        title: 'Democracy: Concepts and Arguments',
        content: `
### What is Democracy?

Democracy is a system of government where power is held by the people.

**Key Principles:**
- **Popular Sovereignty:** Power originates from the people
- **Political Equality:** All citizens have equal political rights
- **Majority Rule with Minority Rights:** Decisions made by majority, but minority rights protected
- **Constitutional Government:** Government operates under a constitution

**Arguments for Democracy:**
1. **Ensures Better Decisions:** Diverse perspectives lead to better solutions
2. **Promotes Freedom:** Citizens have political and personal freedoms
3. **Peaceful Power Transfer:** Transitions happen through elections, not violence
4. **Accountability:** Officials answer to the people
5. **Protects Rights:** Constitution protects individual rights

**Types of Democracy:**
- **Direct Democracy:** Citizens directly vote on issues
- **Representative Democracy:** Citizens elect representatives to decide
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Democratic Decision Making and Political Equality',
        content: `
### How Democracy Works

**Decision Making Process:**
1. **Debate:** Issues discussed openly
2. **Consultation:** Listen to all viewpoints
3. **Voting:** Democratic decision through majority vote
4. **Implementation:** Elected officials carry out decisions

**Political Equality:**
- **Franchise:** Right to vote, regardless of wealth, education, or social status
- **Universal Suffrage:** All adult citizens can vote
- **One Person, One Vote:** Each vote counts equally
- **Equal Representation:** All citizens equally represented in government

**Participation:**
- Voting in elections
- Running for office
- Serving on juries
- Peaceful protest and assembly
- Public discourse and debate
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'Which is a key principle of democracy?',
        options: [
          'Absolute authority of one person',
          'Political equality of all citizens',
          'Power held by the wealthy',
          'Military rule',
        ],
        correctAnswer: 1,
        explanation:
          'Political equality ensures all citizens have equal rights in the democratic process.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Democracy',
        back: 'System of government where power is held by the people',
      },
      { id: 'f2', front: 'Franchise', back: 'Right to vote in elections and political decisions' },
      {
        id: 'f3',
        front: 'Political Equality',
        back: 'All citizens having equal political rights and representation',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What are the main arguments for democracy?',
        answerShort:
          'Democracy ensures better decisions, promotes freedom, enables peaceful power transfer, provides accountability, and protects rights.',
        answerMedium:
          'Democracy is advocated for providing government accountability, protecting individual freedoms, ensuring peaceful transitions of power, and giving citizens a voice in decisions affecting them.',
        answerLong:
          'There are several compelling arguments for democracy as a form of government. First, diverse participation leads to better decision-making as multiple perspectives are considered. Second, democracy protects individual freedoms and rights through constitutional limitations on government power. Third, power transitions happen peacefully through elections rather than violence or coups. Fourth, officials are accountable to the people through elections and public scrutiny. Fifth, democracy respects human dignity by treating all people as political equals with the right to participate in governance. Finally, democratic societies tend to have more stable and prosperous economies as people have incentive to contribute to their own governance.',
      },
    ],
  },

  l17: {
    lessonId: 'l17',
    topics: [
      {
        id: 't1',
        title: 'Poverty: Challenges and Solutions',
        content: `
### Poverty as a Challenge

Poverty remains one of the most pressing social challenges worldwide.

**Defining Poverty:**
- **Absolute Poverty:** Income below survival needs (food, shelter, basic healthcare)
- **Relative Poverty:** Income significantly below average of the society
- **Multi-dimensional Poverty:** Lack of access to education, healthcare, employment, basic utilities

**Causes of Poverty:**
- Lack of education and job opportunities
- Unequal distribution of resources
- Exploitation and discrimination
- Natural disasters and conflicts
- Poor governance and corruption

**Effects of Poverty:**
- Hunger and malnutrition
- Limited access to education and healthcare
- Higher mortality rates
- Cycle of poverty (children inherit poverty)
- Social instability
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Anti-Poverty Measures and Social Programs',
        content: `
### Fighting Poverty: Government Initiatives

**Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA):**
- Guarantees 100 days of employment per year to rural households
- Focus on manual work related to agriculture
- Minimum wage provisions
- Empowers rural poor and addresses unemployment

**Other Anti-Poverty Measures:**
1. **Education Programs:** Free schooling, scholarships, skill development
2. **Healthcare:** Subsidized medical services, health insurance
3. **Microfinance:** Small loans to start businesses
4. **Land Rights:** Secure land ownership for poor families
5. **Direct Cash Transfers:** Providing money directly to poorest households
6. **Food Security:** Public distribution system, subsidized food grains

**Challenges:**
- Implementation difficulties
- Corruption and leakages
- Insufficient resources
- Lack of awareness
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'What does MGNREGA guarantee?',
        options: [
          'Free education',
          '100 days of employment per year',
          'Health insurance',
          'Land ownership',
        ],
        correctAnswer: 1,
        explanation:
          'MGNREGA guarantees 100 days of employment per year to rural households as an anti-poverty measure.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'MGNREGA',
        back: 'Mahatma Gandhi National Rural Employment Guarantee Act',
      },
      {
        id: 'f2',
        front: 'Absolute Poverty',
        back: 'Income below minimum needed for survival (food, shelter)',
      },
      {
        id: 'f3',
        front: 'Multi-dimensional Poverty',
        back: 'Lack of access to education, healthcare, employment, utilities',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is MGNREGA and how does it help fight poverty?',
        answerShort:
          'MGNREGA guarantees 100 days of rural employment per year at minimum wage, providing income and reducing unemployment.',
        answerMedium:
          'The Mahatma Gandhi National Rural Employment Guarantee Act provides employment guarantee to rural households, ensuring minimum income and reducing poverty in rural areas.',
        answerLong:
          "MGNREGA is one of India's most significant anti-poverty programs. It guarantees employment for 100 days per financial year to any rural household whose adult members volunteer for unskilled manual work. Workers are guaranteed minimum wage for this work, which typically involves agricultural activities like building check dams, creating irrigation channels, or planting forests. MGNREGA has multiple benefits: it provides income security to rural poor, creates valuable assets for rural development, prevents distress migration to cities, and empowers women through employment. Additionally, it includes provisions for social security like accident insurance and creates transparency in the process.",
      },
    ],
  },

  l18: {
    lessonId: 'l18',
    topics: [
      {
        id: 't1',
        title: 'Cell Division and Growth',
        content: `
### Cellular Division for Growth and Repair

Cell division is fundamental to biological growth and tissue repair.

**Stages of Cell Cycle:**
1. **G1 Phase:** Cell growth, normal metabolic activities
2. **S Phase:** DNA replication (each chromosome becomes two sister chromatids)
3. **G2 Phase:** Continued growth and protein synthesis in preparation for mitosis
4. **M Phase:** Mitosis and cytokinesis (cell division)

**Mitotic Division:**
Creates two genetically identical daughter cells from one parent cell.
- Used for growth of multicellular organisms
- Replacement of worn-out cells
- Asexual reproduction in some organisms

**Regulation:**
- Checkpoints ensure correct cell division
- Growth factors stimulate cell division
- Contact inhibition stops division when cells touch
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Meiosis and Genetic Variation',
        content: `
### Reduction Division: Preparing for Sexual Reproduction

Meiosis produces gametes (sperm and egg cells) with half the chromosome number.

**Key Features:**
- Reduces chromosome number from diploid (2n) to haploid (n)
- Results in genetic variation through crossing over and independent assortment
- Two divisions: Meiosis I (homologous chromosomes separate) and Meiosis II (sister chromatids separate)
- Produces four non-identical gametes

**Genetic Variation:**
- **Crossing Over:** Exchange of genetic material between homologous chromosomes
- **Independent Assortment:** Random distribution of chromosomes
- **Results:** Each gamete is unique

**Significance:**
- Maintains constant chromosome number across generations
- Creates genetic diversity
- Basis of sexual reproduction and evolution
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'During which phase does DNA replication occur?',
        options: ['G1 Phase', 'S Phase', 'G2 Phase', 'M Phase'],
        correctAnswer: 1,
        explanation: 'DNA replication occurs during the S (Synthesis) Phase of the cell cycle.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Cell Cycle',
        back: 'Process of cell growth and division: G1, S, G2, M phases',
      },
      {
        id: 'f2',
        front: 'Mitosis',
        back: 'Division producing two identical diploid daughter cells',
      },
      { id: 'f3', front: 'Meiosis', back: 'Division producing four unique haploid gametes' },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'What is the purpose of meiosis?',
        answerShort:
          'Meiosis produces gametes with half the chromosome number for sexual reproduction.',
        answerMedium:
          'Meiosis reduces chromosome number from diploid to haploid, creating genetically unique gametes for sexual reproduction.',
        answerLong:
          'Meiosis has several critical purposes. First, it reduces the chromosome number from diploid (2n) to haploid (n), so that when gametes fuse during fertilization, the diploid number is restored in the offspring. Second, it generates genetic variation through crossing over and independent assortment, ensuring each gamete is unique. This genetic diversity is crucial for evolution and adaptation. Third, it enables sexual reproduction, which combines genetic material from two parents. Unlike mitosis which produces identical cells, meiosis is specifically designed to create variation while maintaining chromosome constancy.',
      },
    ],
  },

  l19: {
    lessonId: 'l19',
    topics: [
      {
        id: 't1',
        title: 'Photosynthesis Process and Significance',
        content: `
### The Photosynthetic Journey: From Light to Glucose

Photosynthesis is the foundation of most food chains on Earth.

**Overall Significance:**
- Converts light energy into chemical energy
- Produces oxygen as byproduct
- Produces glucose for energy and structure
- Essential for life on Earth

**Two-Stage Process:**
1. **Light Reactions:** Capture and convert light energy to chemical energy
   - Occurs in thylakoid membranes
   - Produces ATP and NADPH
   - Splits water, releasing oxygen

2. **Dark Reactions (Calvin Cycle):** Use chemical energy to build glucose
   - Occurs in stroma
   - Fixes CO₂ into organic compounds
   - Produces glucose

**Energy Flow:**
Light Energy → Electrons → ATP & NADPH → Glucose (stored energy)
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
      {
        id: 't2',
        title: 'Chloroplast Structure and Function',
        content: `
### The Powerhouse of Plants: Chloroplast Structure

Chloroplasts are specialized organelles where photosynthesis occurs.

**Structure:**
- **Double Membrane:** Outer and inner envelope control entry/exit
- **Thylakoids:** Flattened, membrane-bound sacs arranged in stacks (grana)
- **Stroma:** Fluid-filled space containing enzymes and DNA
- **Grana:** Stacks of thylakoids (site of light reactions)

**Pigments:**
- **Chlorophyll a & b:** Primary photosynthetic pigments (green)
- **Carotenoids:** Yellow-orange pigments
- **Xanthophyll:** Yellow pigments
- **Function:** Absorb light at different wavelengths for maximum energy capture

**Key Fact:** Chloroplasts are similar to mitochondria but perform opposite reactions
- Mitochondria: Glucose → Energy (ATP) → Used for work
- Chloroplast: Light Energy → Glucose → Stored for use
        `,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'What is the primary function of chlorophyll in photosynthesis?',
        options: ['Store glucose', 'Absorb light energy', 'Transport water', 'Release oxygen'],
        correctAnswer: 1,
        explanation:
          'Chlorophyll absorbs light energy, which is the first critical step in photosynthesis.',
      },
    ],
    flashcards: [
      {
        id: 'f1',
        front: 'Photosynthesis',
        back: 'Process converting light energy into glucose; produces oxygen',
      },
      {
        id: 'f2',
        front: 'Thylakoid',
        back: 'Membrane structure in chloroplast where light reactions occur',
      },
      {
        id: 'f3',
        front: 'Stroma',
        back: 'Fluid space in chloroplast where Calvin Cycle (dark reactions) occur',
      },
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'Why is photosynthesis important to all life on Earth?',
        answerShort:
          'Photosynthesis produces oxygen and glucose, forming the basis of most food chains.',
        answerMedium:
          'Photosynthesis converts solar energy into chemical energy stored in glucose and releases oxygen, supporting virtually all life forms.',
        answerLong:
          'Photosynthesis is arguably the most important biological process on Earth. It serves multiple critical functions: First, it produces glucose, which plants use for growth and energy, and which all other organisms depend on through food chains. Second, it releases oxygen as a byproduct, which is essential for respiration in most organisms. Third, it captures solar energy and converts it into chemical form, making energy from the sun available to all life on Earth. Without photosynthesis, there would be no oxygen in the atmosphere and no energy flow to support ecosystems. This is why plants are called producers in food chains.',
      },
    ],
  },
};
