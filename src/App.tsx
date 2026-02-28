import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, Cloud, Database, Code, Lightbulb, Users, Cpu, Sparkles } from 'lucide-react';

interface CloudBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clouds, setClouds] = useState<CloudBubble[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);

    const newClouds: CloudBubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 80 + 40,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.15 + 0.05
    }));
    setClouds(newClouds);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.size) {
          cloud.x = -cloud.size;
          cloud.y = Math.random() * canvas.height;
        }

        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 200, ${cloud.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [clouds]);

  const skillCategories = [
    {
      title: 'Big Data',
      icon: <Database className="w-6 h-6" />,
      skills: ['Spark', 'Hive', 'HDFS', 'Kafka', 'HBase', 'Sqoop', 'Impala']
    },
    {
      title: 'AWS & DevOps',
      icon: <Cloud className="w-6 h-6" />,
      skills: ['Lambda', 'Glue', 'Athena', 'S3', 'Redshift', 'Lake Formation', 'CloudWatch', 'IAM', 'AppFlow', 'Airflow', 'API Gateway', 'EventBridge', 'Jenkins', 'CI/CD', 'Git', 'Bitbucket']
    },
    {
      title: 'Languages',
      icon: <Code className="w-6 h-6" />,
      skills: ['Python', 'Java', 'Groovy', 'SQL', 'Shell Script']
    },
    {
      title: 'Testing & QA',
      icon: <Sparkles className="w-6 h-6" />,
      skills: ['Unit Testing', 'Performance Testing', 'Defect Tracking', 'Integration Testing', 'RCA']
    },
    {
      title: 'Professional Skills',
      icon: <Lightbulb className="w-6 h-6" />,
      skills: ['Creative Thinking', 'Problem Solving', 'Communication', 'Collaboration', 'Troubleshooting', 'Documentation']
    },
    {
      title: 'Domain Expertise',
      icon: <Users className="w-6 h-6" />,
      skills: ['Healthcare - Horizon', 'Banking - BoA', 'Telecom - Ericsson']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      <div className="stars-container absolute inset-0 z-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-cyan-300"
            style={{
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite ${Math.random() * 2}s`,
              boxShadow: '0 0 4px rgba(103, 232, 249, 0.5)'
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.08), transparent 40%)`
        }}
      />

      <nav className="relative z-50 px-6 md:px-12 py-6 flex items-center justify-between backdrop-blur-sm bg-slate-950/30 border-b border-cyan-900/20">
        <div className="flex items-center gap-3">
          <Cloud className="w-6 h-6 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Santosh Dandin
          </span>
        </div>
        <div className="flex gap-6 md:gap-10">
          <button
            onClick={() => setActiveSection('home')}
            className={`text-sm md:text-base transition-all ${activeSection === 'home'
                ? 'text-cyan-400 font-semibold'
                : 'text-gray-300 hover:text-cyan-400'
              }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveSection('mindmap')}
            className={`text-sm md:text-base transition-all ${activeSection === 'mindmap'
                ? 'text-cyan-400 font-semibold'
                : 'text-gray-300 hover:text-cyan-400'
              }`}
          >
            Mind Map
          </button>
          <button
            onClick={() => setActiveSection('skills')}
            className={`text-sm md:text-base transition-all ${activeSection === 'skills'
                ? 'text-cyan-400 font-semibold'
                : 'text-gray-300 hover:text-cyan-400'
              }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveSection('experience')}
            className={`text-sm md:text-base transition-all ${activeSection === 'experience'
                ? 'text-cyan-400 font-semibold'
                : 'text-gray-300 hover:text-cyan-400'
              }`}
          >
            Experience
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {activeSection === 'home' && (
          <div className={`flex flex-col lg:flex-row items-center justify-center min-h-[85vh] max-w-7xl mx-auto px-6 md:px-12 gap-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <div className={`lg:w-1/2 space-y-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
                <Cpu className="w-4 h-4" />
                Cloud Data Engineer
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                  Santosh
                </span>
                <br />
                <span className="text-gray-300">Dandin</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Transforming data into cloud-native solutions. Specializing in <span className="text-cyan-400 font-semibold">AWS</span>, <span className="text-cyan-400 font-semibold">Big Data</span>, and <span className="text-cyan-400 font-semibold">DevOps</span> with expertise across Healthcare, Banking, and Telecom domains.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
                >
                  View Projects
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-slate-800/50 backdrop-blur border border-cyan-500/30 rounded-lg font-semibold hover:bg-slate-800 transition-all"
                >
                  Download Resume
                </a>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-slate-800 transition-all group">
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-slate-800 transition-all group">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-slate-800 transition-all group">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-slate-800 transition-all group">
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>

            <div className={`lg:w-1/2 flex items-center justify-center transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={`${import.meta.env.BASE_URL}Whisk_19db15c569added87cb471d65649c2a0dr.png`}
                    alt="Santosh Dandin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl blur-xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'mindmap' && (
          <div className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12 animate-fadeIn">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              My Technical Universe
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-3xl">
              A visual representation of my technical expertise, professional skills, and domain knowledge interconnected in the cloud ecosystem.
            </p>

            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 bg-slate-900/50 backdrop-blur">
              <img
                src={`${import.meta.env.BASE_URL}Gemini_Generated_Image_6bnw9o6bnw9o6bnw.png`}
                alt="Santosh Dandin Mind Map"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <Database className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Big Data Ecosystem</h3>
                <p className="text-gray-400 text-sm">
                  Expertise in Spark, Kafka, Hive, and distributed data processing frameworks.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <Cloud className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Cloud Native</h3>
                <p className="text-gray-400 text-sm">
                  AWS certified with deep knowledge of Lambda, Glue, Athena, and serverless architectures.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <Users className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Industry Experience</h3>
                <p className="text-gray-400 text-sm">
                  Proven track record in Healthcare, Banking, and Telecom domains.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12 animate-fadeIn">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-3xl">
              A comprehensive toolkit spanning cloud platforms, big data technologies, programming languages, and professional expertise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:transform hover:scale-105 duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1 bg-slate-900/50 border border-cyan-500/20 rounded-full text-sm text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="py-12 md:py-20 max-w-6xl mx-auto px-6 md:px-12 animate-fadeIn">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Professional Journey
            </h2>

            <div className="space-y-8 md:space-y-12 mt-12">
              <div className="relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-all group">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform"></div>
                <div className="text-sm text-cyan-400 mb-2 font-semibold">Current Role</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Cloud Data Engineer</h3>
                <p className="text-gray-400 mb-6">Architecting cloud-native data solutions at scale</p>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                    <p>Designing and implementing scalable data pipelines on AWS using Lambda, Glue, and Athena</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                    <p>Building real-time data processing solutions with Kafka and Spark Streaming</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                    <p>Optimizing data workflows for cost efficiency and performance using Lake Formation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                    <p>Implementing comprehensive testing and QA frameworks for data quality assurance</p>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-all group">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 group-hover:scale-125 transition-transform"></div>
                <div className="text-sm text-blue-400 mb-2 font-semibold">Previous Experience</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Big Data Engineer</h3>
                <p className="text-gray-400 mb-6">Building distributed data processing systems</p>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                    <p>Developed ETL pipelines using Spark, Hive, and Sqoop for large-scale data ingestion</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                    <p>Implemented data warehousing solutions on Redshift and Snowflake</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                    <p>Created automated monitoring systems using CloudWatch and custom alerting frameworks</p>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-all group">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-slate-500 shadow-lg shadow-slate-500/50 group-hover:scale-125 transition-transform"></div>
                <div className="text-sm text-slate-400 mb-2 font-semibold">Domain Expertise</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Industry Experience</h3>
                <p className="text-gray-400 mb-6">Cross-domain technical leadership</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20">
                    <h4 className="font-semibold text-cyan-400 mb-2">Healthcare</h4>
                    <p className="text-sm text-gray-400">Horizon Health - Data pipeline optimization</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20">
                    <h4 className="font-semibold text-cyan-400 mb-2">Banking</h4>
                    <p className="text-sm text-gray-400">Bank of America - Financial data processing</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20">
                    <h4 className="font-semibold text-cyan-400 mb-2">Telecom</h4>
                    <p className="text-sm text-gray-400">Ericsson - Network data analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
