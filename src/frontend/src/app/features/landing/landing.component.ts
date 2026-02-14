import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
<div class="landing-page">
  <!-- Hero Section with Gradient Background -->
  <section class="hero-section">
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    <div class="container">
      <div class="hero-content">
        <div class="profile-avatar animate-fade-in">
          <div class="avatar-glow"></div>
          <div class="avatar-circle">IM</div>
        </div>
        <h1 class="hero-title animate-fade-in-down">Hi, I'm Islam Mohamed</h1>
        <h2 class="hero-subtitle animate-fade-in-up">Senior Software Engineer | Full-Stack Developer</h2>

        <div class="intro-text animate-fade-in-up delay-100">
          <p class="lead">
            Results-driven Senior Software Engineer with expertise in .NET, Angular, and cloud technologies.
            I have extensive experience building scalable fintech and proptech solutions, with a passion for
            clean architecture, performance optimization, and delivering impactful digital solutions.
          </p>
        </div>

        <div class="action-buttons animate-fade-in-up delay-200">
          <a routerLink="/auth/login" class="btn-hero btn-hero-primary">
            <i class="fa fa-play"></i>
            <span>View Demo</span>
          </a>
          <a href="https://github.com/IslamZakaria" target="_blank" class="btn-hero btn-hero-secondary">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/islam-mohamed-zakaria/" target="_blank" class="btn-hero btn-hero-secondary">
            <i class="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Project Context Section with Glassmorphism -->
  <section class="context-section">
    <div class="container">
      <div class="context-card glass-card animate-fade-in">
        <div class="card-glow"></div>
        <h3 class="section-title">Project Context</h3>
        <p class="context-description">
          This is a full-stack application built with <strong>Clean Architecture</strong> principles.
        </p>
        <p class="context-details">
          I chose a modular monolith approach because it allows for clear separation of concerns while keeping the deployment simple.
          I've been refining this architecture to demonstrate best practices in .NET and Angular development, ensuring
          scalability, maintainability, and testability.
        </p>
      </div>
    </div>
  </section>

  <!-- Technical Stack Section -->
  <section class="tech-stack-section">
    <div class="container">
      <h3 class="section-title text-center animate-fade-in">Technical Stack</h3>
      <div class="tech-grid">

        <!-- .NET Core -->
        <div class="tech-card glass-card animate-fade-in delay-100">
          <div class="tech-icon-wrapper">
            <i class="fas fa-code"></i>
          </div>
          <h5 class="tech-title">.NET 10</h5>
          <p class="tech-description">High-performance backend API</p>
        </div>

        <!-- Angular -->
        <div class="tech-card glass-card animate-fade-in delay-150">
          <div class="tech-icon-wrapper">
            <i class="fab fa-angular"></i>
          </div>
          <h5 class="tech-title">Angular</h5>
          <p class="tech-description">Modern, responsive frontend</p>
        </div>

        <!-- PostgreSQL -->
        <div class="tech-card glass-card animate-fade-in delay-200">
          <div class="tech-icon-wrapper">
            <i class="fas fa-database"></i>
          </div>
          <h5 class="tech-title">PostgreSQL</h5>
          <p class="tech-description">Reliable relational database</p>
        </div>

        <!-- Clean Architecture -->
        <div class="tech-card glass-card animate-fade-in delay-250">
          <div class="tech-icon-wrapper">
            <i class="fas fa-layer-group"></i>
          </div>
          <h5 class="tech-title">Clean Architecture</h5>
          <p class="tech-description">Maintainable application structure</p>
        </div>

        <!-- Docker -->
        <div class="tech-card glass-card animate-fade-in delay-300">
          <div class="tech-icon-wrapper">
            <i class="fab fa-docker"></i>
          </div>
          <h5 class="tech-title">Docker</h5>
          <p class="tech-description">Containerization & Deployment</p>
        </div>

      </div>
    </div>
  </section>
</div>
  `,
  styles: [`
    .landing-page {
      font-family: var(--font-family);
      background: var(--bg-primary);
      min-height: 100vh;
    }

    /* Hero Section with Gradient Background */
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: var(--space-16) 0;
    }

    .hero-background {
      position: absolute;
      inset: 0;
      overflow: hidden;
      z-index: 0;
    }

    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.6;
      animation: float 20s ease-in-out infinite;
    }

    .orb-1 {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, var(--accent-orange) 0%, transparent 70%);
      top: -10%;
      left: -10%;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, var(--accent-orange-light) 0%, transparent 70%);
      bottom: -10%;
      right: -10%;
      animation-delay: 7s;
    }

    .orb-3 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, #FF7E31 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 14s;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 var(--space-6);
    }

    /* Profile Avatar */
    .profile-avatar {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto var(--space-8);
    }

    .avatar-glow {
      position: absolute;
      inset: -10px;
      background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
      border-radius: 50%;
      filter: blur(20px);
      opacity: 0.6;
      animation: pulse 3s ease-in-out infinite;
    }

    .avatar-circle {
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-4xl);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      box-shadow: var(--shadow-2xl);
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }

    .hero-title {
      font-size: clamp(var(--text-4xl), 5vw, var(--text-6xl));
      font-weight: var(--font-bold);
      color: var(--text-primary);
      margin-bottom: var(--space-4);
      line-height: var(--leading-tight);
    }

    .hero-subtitle {
      font-size: clamp(var(--text-xl), 3vw, var(--text-3xl));
      font-weight: var(--font-medium);
      color: var(--text-secondary);
      margin-bottom: var(--space-8);
    }

    .intro-text {
      max-width: 700px;
      margin: 0 auto var(--space-10);
    }

    .lead {
      font-size: var(--text-lg);
      line-height: var(--leading-relaxed);
      color: var(--text-secondary);
    }

    /* Hero Buttons */
    .action-buttons {
      display: flex;
      gap: var(--space-4);
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-hero {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-4) var(--space-8);
      font-size: var(--text-base);
      font-weight: var(--font-semibold);
      border-radius: var(--space-3);
      transition: var(--transition-base);
      text-decoration: none;
      cursor: pointer;
    }

    .btn-hero-primary {
      background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
      color: var(--text-primary);
      box-shadow: var(--shadow-glow-lg);
      border: none;
    }

    .btn-hero-primary:hover {
      transform: translateY(-4px);
      box-shadow: 0 0 40px rgba(255, 126, 49, 0.5);
    }

    .btn-hero-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid var(--border-medium);
      color: var(--text-primary);
      backdrop-filter: blur(10px);
    }

    .btn-hero-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--accent-orange);
      transform: translateY(-4px);
    }

    /* Context Section */
    .context-section {
      padding: var(--space-20) 0;
      position: relative;
    }

    .context-card {
      max-width: 900px;
      margin: 0 auto;
      padding: var(--space-10);
      position: relative;
    }

    /* Glassmorphism Effect */
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--space-6);
      backdrop-filter: blur(20px);
      box-shadow: var(--shadow-2xl);
      position: relative;
      overflow: hidden;
    }

    .glass-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255, 126, 49, 0.1) 0%, transparent 50%);
      opacity: 0;
      transition: var(--transition-base);
    }

    .glass-card:hover::before {
      opacity: 1;
    }

    .card-glow {
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
      border-radius: var(--space-6);
      opacity: 0;
      filter: blur(20px);
      transition: var(--transition-base);
      z-index: -1;
    }

    .glass-card:hover .card-glow {
      opacity: 0.3;
    }

    .section-title {
      font-size: var(--text-3xl);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      margin-bottom: var(--space-6);
    }

    .context-description {
      font-size: var(--text-lg);
      color: var(--text-primary);
      margin-bottom: var(--space-4);
    }

    .context-details {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
      margin: 0;
    }

    /* Tech Stack Section */
    .tech-stack-section {
      padding: var(--space-20) 0;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-6);
      margin-top: var(--space-10);
    }

    .tech-card {
      padding: var(--space-8);
      text-align: center;
      transition: var(--transition-base);
    }

    .tech-card:hover {
      transform: translateY(-8px);
    }

    .tech-icon-wrapper {
      width: 80px;
      height: 80px;
      margin: 0 auto var(--space-6);
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-light));
      border-radius: var(--space-4);
      font-size: var(--text-5xl);
      color: var(--text-primary);
      box-shadow: var(--shadow-glow-md);
    }

    .tech-title {
      font-size: var(--text-xl);
      font-weight: var(--font-semibold);
      color: var(--text-primary);
      margin-bottom: var(--space-3);
    }

    .tech-description {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      margin: 0;
    }

    /* Animations */
    .animate-fade-in { 
      animation: fadeIn 1s ease-out; 
      animation-fill-mode: both;
    }
    
    .animate-fade-in-down { 
      animation: fadeInDown 1s ease-out; 
      animation-fill-mode: both;
    }
    
    .animate-fade-in-up { 
      animation: fadeInUp 1s ease-out; 
      animation-fill-mode: both;
    }
    
    .delay-100 { animation-delay: 0.1s; }
    .delay-150 { animation-delay: 0.15s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-250 { animation-delay: 0.25s; }
    .delay-300 { animation-delay: 0.3s; }

    @keyframes fadeIn { 
      from { opacity: 0; } 
      to { opacity: 1; } 
    }
    
    @keyframes fadeInDown { 
      from { 
        opacity: 0; 
        transform: translateY(-30px); 
      } 
      to { 
        opacity: 1; 
        transform: translateY(0); 
      } 
    }
    
    @keyframes fadeInUp { 
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      } 
      to { 
        opacity: 1; 
        transform: translateY(0); 
      } 
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-section {
        min-height: auto;
        padding: var(--space-12) 0;
      }

      .profile-avatar {
        width: 100px;
        height: 100px;
      }

      .action-buttons {
        flex-direction: column;
        align-items: stretch;
      }

      .btn-hero {
        width: 100%;
        justify-content: center;
      }

      .tech-grid {
        grid-template-columns: 1fr;
      }

      .context-card,
      .tech-card {
        padding: var(--space-6);
      }
    }
  `]
})
export class LandingComponent { }
