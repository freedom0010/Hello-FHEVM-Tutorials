import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import InteractiveButton from '../components/InteractiveButton';
import ProgressBar from '../components/ProgressBar';

const IndexPage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const router = useRouter();

  const handleStepClick = (stepNumber: number) => {
    setSelectedStep(stepNumber);
    
    // Navigate to corresponding course page based on step
    const routes = [
      '/courses/[slug]', // Beginner - navigate to first introduction course
      '/courses/[slug]', // Intermediate - navigate to intermediate course
      '/courses/[slug]'  // Advanced - navigate to advanced course
    ];
    
    const slugs = [
      '01-introduction',        // Beginner
      '03-writing-contract',    // Intermediate  
      '05-encryption-decryption' // Advanced
    ];
    
    // Use Next.js router to navigate
    router.push(`/courses/${slugs[stepNumber - 1]}`);
  };

  const handleStartJourney = () => {
    // Navigate to first course page
    router.push('/courses/01-introduction');
  };

  useEffect(() => {
    // Animate steps on scroll
    const steps = document.querySelectorAll('.step');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    steps.forEach(step => {
      (step as HTMLElement).style.opacity = '0';
      (step as HTMLElement).style.transform = 'translateY(30px)';
      (step as HTMLElement).style.transition = 'all 0.6s ease';
      observer.observe(step);
    });

    // Cleanup observer on component unmount
    return () => {
      steps.forEach(step => observer.unobserve(step));
    };
  }, []);

  return (
    <Layout 
      title="Hello FHEVM Tutorials - Learn Privacy Computing Smart Contracts"
      description="Comprehensive learning from basics to deployment, master FHEVM privacy computing smart contract development. Learn homomorphic encryption technology and build privacy-protected blockchain applications."
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Hello</span>
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                FHEVM Tutorials
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Privacy-first smart contract development, making blockchain applications more secure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <InteractiveButton
                size="lg"
                onClick={handleStartJourney}
                className="w-full sm:w-auto"
              >
                Start Learning Journey →
              </InteractiveButton>
              <InteractiveButton
                variant="outline"
                size="lg"
                onClick={() => router.push('/courses/01-introduction')}
                className="w-full sm:w-auto"
              >
                View Courses
              </InteractiveButton>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Welcome to the Future of Privacy Computing
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-primary-600">FHEVM</strong> (Fully Homomorphic Encryption Virtual Machine) enables developers to build smart contracts that process encrypted data without exposing sensitive information. This revolutionary technology opens up new possibilities for privacy-preserving applications on the blockchain.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our comprehensive tutorials will guide you from basic concepts to deploying your first confidential token contract. Whether you're new to cryptography or an experienced blockchain developer, we'll help you master FHEVM step by step.
                </p>
                
                <div className="pt-4">
                  <ProgressBar current={0} total={7} />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Data remains encrypted</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Computation on encrypted data</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Results stay encrypted</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Authorized parties can decrypt</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic concepts to practical deployment, progressively master FHEVM development skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Beginner Step */}
            <div 
              className="group cursor-pointer"
              onClick={() => handleStepClick(1)}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Beginner</h3>
                  <div className="w-12 h-1 bg-green-500 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Start with FHEVM basics, understand fundamental homomorphic encryption principles, and set up your development environment. Learn the core concepts that make privacy smart contracts possible.
                </p>
                <div className="flex items-center text-green-600 font-medium">
                  <span>Start Learning</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Intermediate Step */}
            <div 
              className="group cursor-pointer"
              onClick={() => handleStepClick(2)}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Intermediate</h3>
                  <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Dive deep into FHEVM programming patterns, explore encrypted data types, and build your first privacy-preserving smart contract through practical examples and best practices.
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  <span>Continue Learning</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Advanced Step */}
            <div 
              className="group cursor-pointer"
              onClick={() => handleStepClick(3)}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-secondary-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced</h3>
                  <div className="w-12 h-1 bg-secondary-500 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Master complex FHEVM features, optimize gas usage, implement advanced security patterns, and successfully deploy production-ready confidential token contracts.
                </p>
                <div className="flex items-center text-secondary-600 font-medium">
                  <span>Advanced Learning</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <InteractiveButton
              size="lg"
              onClick={handleStartJourney}
              className="px-8 py-4"
            >
              Start Your FHEVM Learning Journey Now 🚀
            </InteractiveButton>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;