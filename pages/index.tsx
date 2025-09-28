import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const router = useRouter();

  const handleStepClick = (stepNumber: number) => {
    setSelectedStep(stepNumber);
    
    // 根据步骤跳转到对应的课程页面
    const routes = [
      '/courses/[slug]', // Beginner - 可以跳转到第一个介绍课程
      '/courses/[slug]', // Intermediate - 可以跳转到中级课程
      '/courses/[slug]'  // Advanced - 可以跳转到高级课程
    ];
    
    const slugs = [
      '01-introduction',        // Beginner
      '03-writing-contract',    // Intermediate  
      '05-encryption-decryption' // Advanced
    ];
    
    // 使用 Next.js 路由跳转
    router.push(`/courses/${slugs[stepNumber - 1]}`);
  };

  const handleStartJourney = () => {
    // 跳转到第一个课程页面
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
    <>
      <Head>
        <title>Hello FHEVM Tutorials</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .hero {
          text-align: center;
          padding: 80px 0 60px;
          color: white;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .tagline {
          font-size: 1.4rem;
          font-weight: 300;
          margin-bottom: 40px;
          opacity: 0.95;
        }
        
        .intro {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 60px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .intro h2 {
          color: #4a5568;
          margin-bottom: 20px;
          font-size: 1.8rem;
        }
        
        .intro p {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 15px;
        }
        
        .learning-path {
          background: white;
          border-radius: 20px;
          padding: 50px 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .learning-path h2 {
          text-align: center;
          color: #4a5568;
          margin-bottom: 40px;
          font-size: 2.2rem;
        }
        
        .path-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .step {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 30px 25px;
          border-radius: 15px;
          text-align: center;
          position: relative;
          transform: translateY(0);
          transition: all 0.3s ease;
          cursor: pointer;
          user-select: none;
        }
        
        .step:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(240, 147, 251, 0.4);
        }
        
        .step:active {
          transform: translateY(-2px);
          transition: all 0.1s ease;
        }
        
        .step.intermediate {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .step.intermediate:hover {
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }
        
        .step.advanced {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .step.advanced:hover {
          box-shadow: 0 15px 30px rgba(245, 87, 108, 0.4);
        }
        
        .step-number {
          background: rgba(255,255,255,0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin: 0 auto 20px;
        }
        
        .step h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .step p {
          font-size: 0.95rem;
          opacity: 0.95;
          line-height: 1.5;
        }
        
        .cta {
          text-align: center;
          margin-top: 50px;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }
        
        .cta-button:active {
          transform: translateY(0);
          transition: all 0.1s ease;
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .tagline {
            font-size: 1.2rem;
          }
          
          .intro, .learning-path {
            padding: 30px 20px;
          }
          
          .path-steps {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <div className="container">
        <div className="hero">
          <h1>Hello FHEVM Tutorials</h1>
          <div className="tagline">Privacy-first smart contracts made simple</div>
        </div>
        
        <div className="intro">
          <h2>Welcome to the Future of Private Computing</h2>
          <p>FHEVM (Fully Homomorphic Encryption Virtual Machine) enables developers to build smart contracts that process encrypted data without ever revealing sensitive information. This revolutionary technology opens new possibilities for privacy-preserving applications on the blockchain.</p>
          <p>Our comprehensive tutorials will guide you from basic concepts to deploying your first Confidential Token contract. Whether you're new to encryption or an experienced blockchain developer, we'll help you master FHEVM step by step.</p>
        </div>
        
        <div className="learning-path">
          <h2>Your Learning Journey</h2>
          
          <div className="path-steps">
            <div 
              className="step beginner" 
              onClick={() => handleStepClick(1)}
            >
              <div className="step-number">1</div>
              <h3>Beginner</h3>
              <p>Start with FHEVM fundamentals, understand homomorphic encryption basics, and set up your development environment. Learn the core concepts that make private smart contracts possible.</p>
            </div>
            
            <div 
              className="step intermediate"
              onClick={() => handleStepClick(2)}
            >
              <div className="step-number">2</div>
              <h3>Intermediate</h3>
              <p>Dive into FHEVM programming patterns, explore encrypted data types, and build your first privacy-preserving smart contracts with hands-on examples and best practices.</p>
            </div>
            
            <div 
              className="step advanced"
              onClick={() => handleStepClick(3)}
            >
              <div className="step-number">3</div>
              <h3>Advanced</h3>
              <p>Master complex FHEVM features, optimize gas usage, implement advanced security patterns, and successfully deploy a production-ready Confidential Token contract.</p>
            </div>
          </div>
          
          <div className="cta">
            <button 
              className="cta-button"
              onClick={handleStartJourney}
            >
              Start Your Journey →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;