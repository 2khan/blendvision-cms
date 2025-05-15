import { TCourse } from '@/shared/types/models/course'

export const getCourse = (course_id: string) =>
  MOCK_COURSES.find((c) => c.id === course_id)

export const MOCK_COURSES: TCourse[] = [
  {
    id: 'course-001',
    title: 'Introduction to Psychology',
    desc: 'Explore human behavior, cognition, and emotion through scientific methods.',
    thumbnail_url: '/static/mock/psy.webp',
    net_duration: 30600,
    student_count: 1520,
    tags: ['psychology', 'science', 'intro'],
    is_new: false,
    lessons: [
      {
        id: 'lesson-001-01',
        title: 'History of Psychology',
        desc: 'Learn how psychology emerged as a science.',
        duration: '45m',
        order: 1,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-001-02',
        title: 'Research Methods',
        desc: 'Understand how psychologists conduct research.',
        duration: '50m',
        order: 2,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-001-03',
        title: 'Biological Basis of Behavior',
        desc: 'Explore the brain and nervous system.',
        duration: '1h',
        order: 3,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-001-04',
        title: 'Learning and Conditioning',
        desc: 'Classical and operant conditioning explained.',
        duration: '45m',
        order: 4,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-001-05',
        title: 'Memory Systems',
        desc: 'Short-term, long-term, and working memory.',
        duration: '1h',
        order: 5,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      }
    ]
  },
  {
    id: 'course-002',
    title: 'Fundamentals of Algebra',
    desc: 'Master algebraic expressions, equations, and functions with real-world examples.',
    thumbnail_url: '/static/mock/alg.webp',
    net_duration: 25800,
    student_count: 1980,
    tags: ['math', 'algebra', 'highschool'],
    is_new: true,
    lessons: [
      {
        id: 'lesson-002-01',
        title: 'Variables and Expressions',
        desc: 'Intro to variables and how to manipulate them.',
        duration: '35m',
        order: 1,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-002-02',
        title: 'Solving Linear Equations',
        desc: 'Step-by-step solving techniques.',
        duration: '50m',
        order: 2,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-002-03',
        title: 'Graphing Lines',
        desc: 'Plotting and interpreting linear graphs.',
        duration: '1h',
        order: 3,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-002-04',
        title: 'Systems of Equations',
        desc: 'Solving systems by graphing and substitution.',
        duration: '50m',
        order: 4,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-002-05',
        title: 'Inequalities',
        desc: 'Graph and solve inequalities.',
        duration: '55m',
        order: 5,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-002-06',
        title: 'Quadratic Equations',
        desc: 'Understanding and solving quadratics.',
        duration: '1h',
        order: 6,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      }
    ]
  },
  {
    id: 'course-003',
    title: 'World History: 1500 to Present',
    desc: 'Survey global events shaping modern civilizations from 1500 onward.',
    thumbnail_url: '/static/mock/his.webp',
    net_duration: 35100,
    student_count: 1130,
    tags: ['history', 'social studies', 'modern history'],
    is_new: false,
    lessons: [
      {
        id: 'lesson-003-01',
        title: 'Renaissance and Reformation',
        desc: 'Cultural revival and religious changes.',
        duration: '55m',
        order: 1,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-003-02',
        title: 'Age of Exploration',
        desc: 'European expansion across the globe.',
        duration: '1h',
        order: 2,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-003-03',
        title: 'Industrial Revolution',
        desc: 'Transformations in economy and society.',
        duration: '1h',
        order: 3,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-003-04',
        title: 'World Wars Overview',
        desc: 'World War I and II, causes and impact.',
        duration: '1h 30m',
        order: 4,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-003-05',
        title: 'Modern Globalization',
        desc: 'Technology and trade in a connected world.',
        duration: '50m',
        order: 5,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      }
    ]
  },
  {
    id: 'course-004',
    title: 'AP Biology Essentials',
    desc: 'Core topics in molecular biology, evolution, and ecology for AP exam prep.',
    thumbnail_url: '/static/mock/bio.webp',
    net_duration: 37200,
    student_count: 2450,
    tags: ['biology', 'science', 'AP'],
    is_new: false,
    lessons: [
      {
        id: 'lesson-004-01',
        title: 'Cell Structure and Function',
        desc: 'Overview of organelles and membranes.',
        duration: '1h',
        order: 1,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-004-02',
        title: 'Genetics and Heredity',
        desc: 'Mendelian genetics and Punnett squares.',
        duration: '50m',
        order: 2,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-004-03',
        title: 'DNA and Protein Synthesis',
        desc: 'Transcription and translation basics.',
        duration: '1h',
        order: 3,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-004-04',
        title: 'Evolution and Natural Selection',
        desc: 'Darwin’s theories and evidence.',
        duration: '1h',
        order: 4,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-004-05',
        title: 'Ecology and Ecosystems',
        desc: 'Energy flow and environmental dynamics.',
        duration: '1h 10m',
        order: 5,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-004-06',
        title: 'Human Body Systems',
        desc: 'Anatomy and physiological functions.',
        duration: '1h 20m',
        order: 6,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      }
    ]
  },
  {
    id: 'course-005',
    title: 'Computer Science Basics',
    desc: 'Introduction to computing, logic, and basic programming using Python.',
    thumbnail_url: '/static/mock/cs.webp',
    net_duration: 27900,
    student_count: 1760,
    tags: ['computer science', 'python', 'coding'],
    is_new: true,
    lessons: [
      {
        id: 'lesson-005-01',
        title: 'What is Computer Science?',
        desc: 'Understanding computing concepts.',
        duration: '35m',
        order: 1,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-005-02',
        title: 'Intro to Python Syntax',
        desc: 'Variables, data types, and control flow.',
        duration: '55m',
        order: 2,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-005-03',
        title: 'Functions and Loops',
        desc: 'Reusable code and iteration.',
        duration: '1h',
        order: 3,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-005-04',
        title: 'Data Structures',
        desc: 'Lists, dictionaries, and sets in Python.',
        duration: '1h',
        order: 4,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-005-05',
        title: 'Intro to Algorithms',
        desc: 'Sorting and searching basics.',
        duration: '50m',
        order: 5,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      }
    ]
  },
  {
    id: 'course-006',
    title: 'Creative Writing Workshop',
    desc: 'Practice crafting compelling fiction, poetry, and creative nonfiction.',
    thumbnail_url: '/static/mock/lit.webp',
    net_duration: 24600,
    student_count: 980,
    tags: ['writing', 'creative', 'literature'],
    is_new: true,
    lessons: [
      {
        id: 'lesson-006-01',
        title: 'Building a Writing Habit',
        desc: 'Daily writing exercises and prompts.',
        duration: '40m',
        order: 1,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-006-02',
        title: 'Fiction Fundamentals',
        desc: 'Plot, character, and conflict.',
        duration: '55m',
        order: 2,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-006-03',
        title: 'Writing Poetry',
        desc: 'Meter, form, and vivid imagery.',
        duration: '1h',
        order: 3,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-006-04',
        title: 'Creative Nonfiction',
        desc: 'Memoir and personal essays.',
        duration: '1h',
        order: 4,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      },
      {
        id: 'lesson-006-05',
        title: 'Editing and Feedback',
        desc: 'Revising your work and giving critiques.',
        duration: '45m',
        order: 5,
        thumbnail_url: '/static/placeholder.png',
        video_url: '/videos/rickroll.mp4'
      }
    ]
  }
]
