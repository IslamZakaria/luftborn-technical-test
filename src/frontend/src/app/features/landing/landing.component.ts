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

        <div class="intro-grid animate-fade-in-up delay-100">
          <div class="intro-card glass-card">
             <p class="lead">
              Results-driven Senior Software Engineer with expertise in .NET, Angular, and cloud technologies.
              I have extensive experience building scalable fintech and proptech solutions, with a passion for
              clean architecture, performance optimization, and delivering impactful digital solutions.
            </p>
          </div>
        </div>

        <div class="action-buttons animate-fade-in-up delay-200">
          <a routerLink="/auth/login" class="btn-hero btn-hero-primary">
            <i class="fa fa-play"></i>
            <span>View Demo</span>
          </a>
          <a href="https://github.com/IslamZakaria" target="_blank" class="btn-hero btn-hero-github">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/islam-mohamed-zakaria/" target="_blank" class="btn-hero btn-hero-linkedin">
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
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: var(--bg-primary, #0f172a);
      color: #fff;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Hero Section with Gradient Background */
    .hero-section {
      position: relative;
      min-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 4rem 0;
    }

    .hero-background {
      position: absolute;
      inset: 0;
      overflow: hidden;
      z-index: 0;
      background: radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%);
    }

    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.4;
      animation: float 20s ease-in-out infinite;
    }

    .orb-1 {
      width: 600px;
      height: 600px;
      background: #FF7E31;
      top: -20%;
      left: -10%;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 500px;
      height: 500px;
      background: #3b82f6;
      bottom: -10%;
      right: -10%;
      animation-delay: -5s;
    }

    .orb-3 {
      width: 400px;
      height: 400px;
      background: #8b5cf6;
      top: 40%;
      left: 60%;
      opacity: 0.3;
      animation-delay: -10s;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(50px, -50px) scale(1.1); }
      66% { transform: translate(-30px, 50px) scale(0.9); }
    }

    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Profile Avatar */
    .profile-avatar {
      position: relative;
      width: 140px;
      height: 140px;
      margin: 0 auto 2rem;
    }

    .avatar-glow {
      position: absolute;
      inset: -4px;
      background: linear-gradient(135deg, #FF7E31, #fb923c);
      border-radius: 50%;
      filter: blur(15px);
      opacity: 0.8;
      animation: pulse 3s ease-in-out infinite;
    }

    .avatar-circle {
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1e293b, #0f172a);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: 700;
      color: #FF7E31;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }

    .hero-title {
      font-size: clamp(3rem, 6vw, 5rem);
      font-weight: 800;
      background: linear-gradient(to right, #fff, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: clamp(1.25rem, 3vw, 2rem);
      font-weight: 500;
      color: #94a3b8;
      margin-bottom: 3rem;
    }

    .intro-grid {
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .intro-card {
      max-width: 800px;
      padding: 2rem;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      backdrop-filter: blur(12px);
    }

    .lead {
      font-size: 1.25rem;
      line-height: 1.8;
      color: #e2e8f0;
      margin: 0;
    }

    /* Hero Buttons */
    .action-buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-hero {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      font-size: 1.125rem;
      font-weight: 600;
      border-radius: 0.75rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1px solid transparent;
    }

    .btn-hero i {
      font-size: 1.4rem;
    }

    .btn-hero-primary {
      background: linear-gradient(135deg, #FF7E31 0%, #ea580c 100%);
      color: white;
      box-shadow: 0 10px 15px -3px rgba(255, 126, 49, 0.3);
    }

    .btn-hero-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(255, 126, 49, 0.4);
      filter: brightness(1.1);
    }

    .btn-hero-github {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    .btn-hero-github:hover {
      background: #24292e;
      border-color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .btn-hero-linkedin {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    .btn-hero-linkedin:hover {
      background: #0077b5;
      border-color: transparent;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(0, 119, 181, 0.4);
    }

    /* Glass Card Standard */
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 1rem;
      backdrop-filter: blur(20px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
    }

    .glass-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-4px);
    }

    /* Context Section */
    .context-section {
      padding: 6rem 0;
      background: linear-gradient(to bottom, #0f172a, #1e293b);
    }

    .context-card {
      max-width: 900px;
      margin: 0 auto;
      padding: 3rem;
      text-align: center;
    }

    .section-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 2rem;
      text-align: center;
    }

    .context-description {
      font-size: 1.5rem;
      font-weight: 600;
      color: #FF7E31;
      margin-bottom: 1.5rem;
    }

    .context-details {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #cbd5e1;
    }

    /* Tech Stack Section */
    .tech-stack-section {
      padding: 6rem 0;
      background: #0f172a;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .tech-card {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      height: 100%;
    }

    .tech-icon-wrapper {
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: #FF7E31;
      background: rgba(255, 126, 49, 0.1);
      border-radius: 1rem;
      transition: transform 0.3s ease;
    }

    .tech-card:hover .tech-icon-wrapper {
      transform: scale(1.1) rotate(5deg);
      background: rgba(255, 126, 49, 0.2);
    }

    .tech-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.5rem;
    }

    .tech-description {
      font-size: 0.875rem;
      color: #94a3b8;
      line-height: 1.5;
    }

    /* Animation Utilities */
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
    .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; opacity: 0; }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
    
    .delay-100 { animation-delay: 0.1s; }
    .delay-150 { animation-delay: 0.15s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-250 { animation-delay: 0.25s; }
    .delay-300 { animation-delay: 0.3s; }

    @keyframes fadeIn {
      to { opacity: 1; }
    }
    
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Respnsive */
    @media (max-width: 768px) {
      .hero-title { font-size: 2.5rem; }
      .hero-subtitle { font-size: 1.25rem; }
      .action-buttons { flex-direction: column; width: 100%; }
      .btn-hero { width: 100%; justify-content: center; }
      .intro-card { padding: 1.5rem; }
    }
  `]
})
export class LandingComponent { }
