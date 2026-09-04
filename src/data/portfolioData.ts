import { Project, MetricItem, FaqItem, Pillar, SkillGaugeItem } from '../types';

export const PERSONAL_INFO = {
  name: 'EKJOT SINGH NAGPAL',
  brandName: 'EKJOT NAGPAL',
  role: 'Aspiring Software Development Engineer & AI Practitioner',
  education: 'B.Tech in Computer Engineering (CE), Mizoram University (2023–2027)',
  location: 'Shimla, Himachal Pradesh · Aizawl, Mizoram',
  email: 'nagpalekjotsingh@gmail.com',
  github: 'https://github.com/Nagpal-11',
  portfolioUrl: 'https://ekjotnagpal.in',
  summary:
    'Final-year Computer Engineering student with a solid foundation in Data Structures & Algorithms, Python, and C/C++, paired with hands-on deep learning model engineering (ANNs, RNNs) using TensorFlow, Keras, and PyTorch. Comfortable working across the entire development lifecycle from mathematical architecture to cloud deployment.',
  heroHeadline: 'ENGINEERING INTELLIGENT SYSTEMS, DEEP LEARNING ARCHITECTURES & ROBUST SOFTWARE.',
  heroSubtitle:
    'Translating complex algorithmic and neural models into performant, accessible digital products that solve high-stakes challenges.',
};

export const CORE_PILLARS: Pillar[] = [
  {
    id: 'intelligence',
    title: 'INTELLIGENCE',
    headline: 'Mathematical models engineered for real-world inference.',
    description:
      'We design and train neural network architectures from scratch—from custom Recurrent Neural Networks (RNNs) with over 1.3M parameters and 94%+ accuracy to fine-tuned LLaMA2 large language models for medical symptom triage.',
    capabilities: [
      'Recurrent & Artificial Neural Networks (RNN/ANN)',
      'TensorFlow, Keras & PyTorch Pipelines',
      'NLP, Sentiment Inference & Tokenization',
      'Model Optimization & Real-Time Scoring',
    ],
    cardTag: 'Deep Learning / NLP',
    metric: '94.23% Inference Accuracy',
  },
  {
    id: 'architecture',
    title: 'ARCHITECTURE',
    headline: 'High-performance core computer science without compromise.',
    description:
      'Robust software starts with deterministic computer science fundamentals. We engineer systems with clean Object-Oriented patterns, rigorous Data Structures & Algorithms, and optimized database queries that operate with minimal latency.',
    capabilities: [
      'Data Structures & Algorithmic Complexity (DSA)',
      'Systems Programming in C & C++',
      'Object-Oriented Design & Clean SDLC',
      'SQL Query Optimization & Debugging',
    ],
    cardTag: 'Core Systems / Engineering',
    metric: 'O(1) / O(log N) Precision',
  },
  {
    id: 'product',
    title: 'PRODUCT',
    headline: 'From grant-funded research to deployed user-facing platforms.',
    description:
      'Recipients of the ₹500,000 MeitY GENESIS Entrepreneur-in-Residence grant and winners of the national Yuvamanthan Hackathon (Govt. of India). We bridge the gap between experimental code and deployable, accessible software.',
    capabilities: [
      'MeitY GENESIS EiR Grant Execution (₹5L)',
      'Full-Stack Flask & Streamlit Deployment',
      'User-Centered Clinical & Analytical UX',
      'Data-Driven Market & Product Strategy',
    ],
    cardTag: 'Product & Grant Execution',
    metric: '₹5 Lakh Grant Secured',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'clinical-ai',
    title: 'Clinical AI Platform — Healthcare Diagnostic Engine',
    category: 'Government-Backed HealthTech / LLMs',
    subtitle: 'Accessibility-focused clinical triage powered by fine-tuned LLaMA2 & Flask.',
    summary:
      'Selected under the prestigious MeitY GENESIS Entrepreneur-in-Residence program with a ₹5 Lakh grant to build an innovative healthcare-tech solution for accessible medical symptom analysis and guidance across underserved communities.',
    highlights: [
      'Awarded ₹500,000 government grant under the MeitY GENESIS EiR program to pioneer accessible healthcare.',
      'Won 1st Place at the Yuvamanthan Hackathon 2025 organized by Mizoram University and Ministry of Education, Govt. of India.',
      'Built a conversational clinical guidance assistant combining LLaMA2 with a lightweight Flask backend for deterministic symptom parsing.',
      'Designed a multi-disciplinary technical architecture ensuring privacy-compliant patient record interaction.',
    ],
    metrics: [
      { label: 'Grant Funding', value: '₹500,000' },
      { label: 'Recognition', value: 'Ministry of Education' },
      { label: 'Core Tech', value: 'LLaMA2 + Flask' },
    ],
    tags: ['LLaMA2', 'Flask', 'Python', 'NLP', 'Healthcare Tech', 'MeitY GENESIS'],
    githubUrl: 'https://github.com/Nagpal-11',
    accentColor: '#2563eb',
    videoPlaceholder: {
      badgeText: 'CLINICAL TRIAGE PREVIEW',
      headline: 'Conversational Symptom Engine & Medical Routing Flow',
    },
  },
  {
    id: 'sentiment-rnn',
    title: 'Interactive Sentiment Analysis Engine',
    category: 'Deep Learning / Neural Networks',
    subtitle: 'Custom Simple RNN architecture achieving 94.23% accuracy on real-time text.',
    summary:
      'Engineered an end-to-end deep learning web application from scratch to classify sentence sentiment with microsecond inference times, balancing network depth with minimal memory footprint.',
    highlights: [
      'Architected and trained a custom Simple RNN with 1,313,025 trainable parameters (~5.01 MB footprint).',
      'Attained an outstanding test accuracy of 94.23% through rigorous hyperparameter tuning and regularization.',
      'Implemented custom text pre-processing, vocabulary tokenization, and vector embeddings.',
      'Packaged the neural model into an interactive web interface offering real-time confidence scores and sentiment breakdown.',
    ],
    metrics: [
      { label: 'Trainable Params', value: '1,313,025' },
      { label: 'Test Accuracy', value: '94.23%' },
      { label: 'Model Size', value: '~5.01 MB' },
    ],
    tags: ['Python', 'TensorFlow', 'Keras', 'RNN', 'Deep Learning', 'NLP'],
    githubUrl: 'https://github.com/Nagpal-11',
    accentColor: '#0ea5e9',
    videoPlaceholder: {
      badgeText: 'NEURAL INFERENCE DEMO',
      headline: 'Real-Time Sentiment Tokenization & Probability Gauge',
    },
  },
  {
    id: 'churn-ann',
    title: 'End-to-End Customer Churn Intelligence',
    category: 'Predictive Analytics / ANN',
    subtitle: 'Artificial Neural Network predicting customer churn probability from behavioral data.',
    summary:
      'Built a complete predictive intelligence pipeline utilizing Artificial Neural Networks to analyze historical customer behavior, identifying risk factors and outputting actionable churn probabilities in real time.',
    highlights: [
      'Designed an Artificial Neural Network trained on multi-dimensional customer behavioral patterns and transactions.',
      'Implemented full data preprocessing pipeline: missing value imputation, one-hot encoding, and feature scaling.',
      'Deployed the validated model as a production Streamlit web application with interactive scenario testing.',
      'Enabled business stakeholders to simulate customer profile changes and observe churn sensitivity in real time.',
    ],
    metrics: [
      { label: 'Architecture', value: 'Dense ANN' },
      { label: 'Deployment', value: 'Streamlit Cloud' },
      { label: 'Pipeline', value: 'Scikit-Learn + Keras' },
    ],
    tags: ['TensorFlow', 'Keras', 'ANN', 'Streamlit', 'Python', 'Feature Engineering'],
    githubUrl: 'https://github.com/Nagpal-11',
    accentColor: '#10b981',
    videoPlaceholder: {
      badgeText: 'CHURN PROJECTION ENGINE',
      headline: 'Behavioral Sensitivity Slider & Retention Risk Heatmap',
    },
  },
  {
    id: 'milk-candy-growth',
    title: 'Milk Candy Market Expansion Model',
    category: 'Quantitative Strategy',
    subtitle: 'Data-driven growth model scaling regional brand presence across Northeast India.',
    summary:
      'Spearheaded the quantitative market analysis and strategic expansion framework for regional FMCG ice cream brand "Milk Candy", securing 1st Place in the competitive university case study challenge.',
    highlights: [
      'Secured 1st place among competing multidisciplinary collegiate teams in October 2025.',
      'Synthesized regional retail distribution data, customer willingness-to-pay elasticity, and supply chain logistics.',
      'Formulated an algorithmic route-to-market optimization plan for cold chain delivery in hill terrains.',
      'Integrated unit economic projections demonstrating viable path to rapid retail margin expansion.',
    ],
    metrics: [
      { label: 'Result', value: '1st Place Winner' },
      { label: 'Region', value: 'Northeast India' },
      { label: 'Role', value: 'Strategy & Data Lead' },
    ],
    tags: ['Market Analytics', 'Quantitative Strategy', '1st Place Champion'],
    accentColor: '#f59e0b',
    videoPlaceholder: {
      badgeText: 'STRATEGY BLUEPRINT',
      headline: 'Supply Chain Heatmap & Cold Chain Margin Model',
    },
  },
];

export const METRICS_GRID: MetricItem[] = [
  {
    metric: '₹5,00,000',
    label: 'Grant Funding Secured',
    description: 'MeitY GENESIS Entrepreneur-in-Residence award recipient.',
    detail: 'Selected by the Ministry of Electronics and Information Technology to build and scale an accessible clinical AI healthcare platform.',
    tag: 'Govt. Grant',
  },
  {
    metric: '1,313,025',
    label: 'Trainable Parameters',
    description: 'Custom-engineered Deep Learning Simple RNN architecture.',
    detail: 'Achieved 94.23% classification accuracy with a compact ~5.01 MB footprint optimized for edge and web inference.',
    tag: 'Deep Learning',
  },
  {
    metric: '1st Place',
    label: 'National Hackathon & Case Study',
    description: 'Yuvamanthan Hackathon 2025 & Case Study Champion.',
    detail: 'Recognized by Mizoram University and the Ministry of Education, Govt. of India for technical execution in clinical AI prototypes.',
    tag: 'Accolades',
  },
  {
    metric: 'AI Lead',
    label: 'AI Club Coordinator',
    description: 'Mizoram University student body leadership.',
    detail: 'Organized university-wide machine learning workshops, hackathons, and industry mentorship sessions for aspiring engineers.',
    tag: 'Leadership',
  },
  {
    metric: 'Olympiad',
    label: 'State Space Olympiad Qualifier',
    description: 'State-level analytical and logic problem-solving honors.',
    detail: 'Distinguished for rapid algorithmic deduction, mathematical reasoning, and structural physics problem solving.',
    tag: 'Analytical',
  },
  {
    metric: 'Core CS',
    label: 'Rigorous Technical Foundation',
    description: 'Data Structures, Algorithms & Systems Programming.',
    detail: 'Proficient in C, C++, Python, SQL, OOP design patterns, query tuning, and end-to-end SDLC deployment.',
    tag: 'Engineering',
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Are you a deep learning specialist, or a software development engineer?',
    answerPrefix: 'Both, when building production-ready systems.',
    answerBody:
      'The most transformative AI software cannot survive without rigorous computer science fundamentals. I bridge the gap: designing mathematical neural architectures (ANNs, RNNs, LLM integration) while implementing clean, memory-conscious code, robust APIs, and deterministic data structures in Python and C/C++.',
  },
  {
    id: 'faq-2',
    question: 'What is your experience taking projects from concept to real-world funding?',
    answerPrefix: 'Proven through competitive grants and national recognition.',
    answerBody:
      'Through my clinical AI research, I secured a ₹5 Lakh grant from the MeitY GENESIS Entrepreneur-in-Residence program and won the Ministry of Education’s Yuvamanthan Hackathon 2025. This experience demanded not just coding, but cross-functional planning, feasibility auditing, and pitch defense before senior evaluators.',
  },
  {
    id: 'faq-3',
    question: 'What is your core tech stack and development methodology?',
    answerPrefix: 'A pragmatic, performance-driven toolkit.',
    answerBody:
      'For machine learning, I work with TensorFlow, Keras, PyTorch, and HuggingFace/LLaMA2. For core systems and software engineering, I specialize in Python, C, C++, SQL, and modern web frameworks (Flask, Streamlit, RESTful APIs). I follow standard Git workflows, modular object-oriented architecture, and test-driven validation.',
  },
  {
    id: 'faq-4',
    question: 'Are you available for Associate Software Engineer roles and internships?',
    answerPrefix: 'Yes, actively exploring upcoming opportunities.',
    answerBody:
      'As a final-year B.Tech Computer Engineering student (graduating 2027 from Mizoram University), I am actively seeking Associate Software Engineer roles, SDE internships, and forward-thinking engineering teams where high-impact problem solving is valued.',
  },
  {
    id: 'faq-5',
    question: 'How do you handle team collaboration and student leadership?',
    answerPrefix: 'Hands-on, collaborative, and community-driven.',
    answerBody:
      'As the AI Club Coordinator at Mizoram University, I regularly mentor peers, coordinate competitive hackathons, and facilitate hands-on ML workshops. I thrive in multidisciplinary teams where software engineers, researchers, and domain experts collaborate closely.',
  },
];

export const SKILL_GAUGES: SkillGaugeItem[] = [
  {
    id: 'deep-learning',
    name: 'Deep Learning & Neural Architectures',
    shortName: 'Deep Learning',
    category: 'Deep Learning',
    percentage: 94,
    level: 'PRODUCTION MASTERY',
    telemetryBadge: '~5.01 MB FOOTPRINT // 94.23% TEST ACC',
    highlightMetric: '94.23% Test Acc · 1.31M Trainable Params',
    description:
      'Architecting recurrent (Simple RNN) and artificial neural networks (ANN) from scratch. Hyperparameter regularization, gradient optimization, loss surface diagnostics, and latency-budgeted model compilation.',
    keyTools: ['TensorFlow', 'Keras', 'PyTorch', 'RNN', 'ANN', 'Scikit-Learn'],
    proofProject: 'Interactive Sentiment RNN (94.23% Acc)',
    accentColor: '#2563eb',
    snippet: {
      language: 'python',
      filename: 'sentiment_rnn.py',
      githubUrl: 'https://github.com/Nagpal-11/SimpleRNN-IMDB-Movie-Review-Sentiment-Analysis',
      benchmarkNote: 'Inference runtime: 4.12ms on CPU · 1.31M parameters',
      code: `class SentimentRNN(nn.Module):
    def forward(self, x: torch.Tensor, h0: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        embeds = self.embedding(x)
        out, hn = self.rnn(embeds, h0)
        logits = self.fc(self.dropout(out[:, -1, :]))
        return torch.sigmoid(logits), hn`,
    },
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms (DSA)',
    shortName: 'Data Structures',
    category: 'Core CS',
    percentage: 92,
    level: 'RIGOROUS ALGORITHMIC',
    telemetryBadge: 'O(1) SPACE // STATE OLYMPIAD QUALIFIER',
    highlightMetric: 'O(1) / O(log N) Time & Space Optimality',
    description:
      'Deterministic algorithm design, amortized time/space complexity analysis, graph traversals (BFS/DFS), dynamic programming, tree balancing, and optimal memory access patterns.',
    keyTools: ['C / C++', 'Python', 'Graphs & Trees', 'Dynamic Programming', 'Complexity Theory'],
    proofProject: 'State Olympiad Qualifier & Hackathon Champion',
    accentColor: '#0ea5e9',
    snippet: {
      language: 'cpp',
      filename: 'binary_search.cpp',
      githubUrl: 'https://github.com/Nagpal-11',
      benchmarkNote: 'O(log N) runtime bound · 0 heap allocations',
      code: `int searchOptimal(const std::vector<int>& arr, int target) {
    int low = 0, high = static_cast<int>(arr.size()) - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        (arr[mid] < target) ? low = mid + 1 : high = mid - 1;
    }
    return -1; // O(1) auxiliary space guarantee
}`,
    },
  },
  {
    id: 'systems-oop',
    name: 'Systems & Object-Oriented Engineering',
    shortName: 'Systems & OOP',
    category: 'Core CS',
    percentage: 90,
    level: 'ENGINEERING DISCIPLINE',
    telemetryBadge: 'STRICT OOP // DETERMINISTIC MEMORY',
    highlightMetric: 'Strict OOP Paradigms & Clean Architecture',
    description:
      'Writing idiomatic, maintainable object-oriented code following SOLID principles. Memory management in C/C++, polymorphic abstractions, robust exception handling, and modular software design.',
    keyTools: ['C++', 'Python 3', 'OOP Patterns', 'STL', 'Modular Architecture'],
    proofProject: 'Multi-Module Systems & Clinical Core',
    accentColor: '#3b82f6',
    snippet: {
      language: 'cpp',
      filename: 'engine_contract.hpp',
      githubUrl: 'https://github.com/Nagpal-11',
      benchmarkNote: 'SOLID architecture · RAII deterministic teardown',
      code: `class IInferenceEngine {
public:
    virtual ~IInferenceEngine() = default;
    virtual Result<TensorOutput> evaluate(const TensorBatch& input) const = 0;
    virtual SystemTelemetry auditMemoryBounds() noexcept = 0;
}; // Polymorphic LSP interface with zero-leak lifecycle`,
    },
  },
  {
    id: 'llm-nlp',
    name: 'Large Language Models & NLP',
    shortName: 'LLMs & NLP',
    category: 'Deep Learning',
    percentage: 88,
    level: 'ADVANCED APPLIED',
    telemetryBadge: 'LORA / QLORA // VECTOR EMBEDDINGS',
    highlightMetric: 'LLaMA2 Fine-Tuning & Clinical Triage',
    description:
      'Leveraging open-weights foundation models, custom tokenizers, vector embeddings, prompt engineering, and deterministic medical triage parsing pipelines.',
    keyTools: ['LLaMA2', 'HuggingFace', 'Tokenization', 'Vector Embeddings', 'Flask REST'],
    proofProject: 'Clinical AI Platform (MeitY ₹5L Grant)',
    accentColor: '#6366f1',
    snippet: {
      language: 'python',
      filename: 'clinical_router.py',
      githubUrl: 'https://github.com/Nagpal-11/ANN-Classification-Churn',
      benchmarkNote: 'PEFT 4-bit quantization · 128 token streaming budget',
      code: `@router.post("/v1/triage/stream")
async def evaluate_tokens(req: ClinicalPrompt) -> AsyncIterator[str]:
    inputs = tokenizer(req.prompt, return_tensors="pt", truncation=True).to("cuda")
    tokens = model.generate(**inputs, max_new_tokens=128, temperature=0.1)
    for token in streamer:
        yield ClinicalSchema.parse_chunk(token)`,
    },
  },
  {
    id: 'backend-apis',
    name: 'Backend Microservices & Serving',
    shortName: 'Backend & APIs',
    category: 'Systems & APIs',
    percentage: 86,
    level: 'PRODUCTION READY',
    telemetryBadge: '<12MS P99 LATENCY // REST & WSGI',
    highlightMetric: 'Microsecond Inference Routing & WSGI',
    description:
      'Building performant, lightweight Python microservices (Flask, Streamlit) that wrap neural models in clean RESTful interfaces, managing request concurrency and payload parsing.',
    keyTools: ['Flask', 'Streamlit', 'REST APIs', 'Postman', 'Git CI/CD', 'Linux'],
    proofProject: 'Clinical API & Streamlit Cloud',
    accentColor: '#0284c7',
    snippet: {
      language: 'python',
      filename: 'telemetry_middleware.py',
      githubUrl: 'https://github.com/Nagpal-11/ANN-Classification-Churn',
      benchmarkNote: 'P99 Latency: 11.4ms · WSGI production threadpool',
      code: `@app.middleware("http")
async def latency_tracker(request: Request, call_next):
    t0 = time.perf_counter_ns()
    response = await call_next(request)
    elapsed_ms = (time.perf_counter_ns() - t0) / 1e6
    response.headers["X-Telemetry-P99-Ms"] = f"{elapsed_ms:.2f}"
    return response`,
    },
  },
  {
    id: 'relational-sql',
    name: 'Relational Modeling & Database Systems',
    shortName: 'SQL & Databases',
    category: 'Data & Cloud',
    percentage: 85,
    level: 'PRACTICAL PROFICIENT',
    telemetryBadge: '3NF NORMALIZED // B-TREE INDEXED',
    highlightMetric: '3NF Normalization & Index Optimization',
    description:
      'Designing normalized relational schemas (3NF), complex multi-table joins, subqueries, B-tree indexing strategies, and transactional integrity guarantees for structured records.',
    keyTools: ['SQL', 'PostgreSQL / MySQL', 'Schema Normalization', 'Index Tuning'],
    proofProject: 'Churn Analytics DB & Healthcare Schema',
    accentColor: '#10b981',
    snippet: {
      language: 'sql',
      filename: 'risk_telemetry_index.sql',
      githubUrl: 'https://github.com/Nagpal-11/ZD-Milk-Processing',
      benchmarkNote: 'Index scan execution time: 0.842ms · 3NF normalized',
      code: `-- Composite B-Tree index scan (tier, churn_prob DESC)
EXPLAIN ANALYZE
SELECT user_id, risk_score, last_active
FROM telemetry_sessions
WHERE tier = 'PRODUCTION' AND churn_prob > 0.65
ORDER BY computed_at DESC LIMIT 50; -- Exec: 0.842ms`,
    },
  },
];

