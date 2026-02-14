import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
<div class="landing-page">
  <!-- Hero Section -->
  <section class="hero-section text-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h1 class="display-4 fw-bold mb-3 animate-fade-in-down">Hi, I'm Islam Mohamed</h1>
          <h2 class="h3 text-muted mb-4 animate-fade-in-up">Senior Software Engineer | Full-Stack Developer</h2>

          <div class="intro-text mb-5 animate-fade-in-up delay-100">
            <p class="lead">
              Results-driven Senior Software Engineer with expertise in .NET, Angular, and cloud technologies.
              I have extensive experience building scalable fintech and proptech solutions, with a passion for
              clean architecture, performance optimization, and delivering impactful digital solutions.
            </p>
          </div>

          <div class="action-buttons animate-fade-in-up delay-200">
            <a routerLink="/products" class="btn btn-primary btn-lg me-3 px-4 shadow-sm">
              <i class="fa fa-play me-2"></i>View Demo
            </a>
            <a href="https://github.com/IslamZakaria" target="_blank" class="btn btn-outline-dark btn-lg me-3 px-4">
              <i class="fab fa-github me-2"></i>GitHub
            </a>
            <a href="https://www.linkedin.com/in/islam-mohamed-zakaria/" target="_blank"
              class="btn btn-outline-primary btn-lg px-4">
              <i class="fab fa-linkedin me-2"></i>LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Project Context Section -->
  <section class="context-section py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card shadow-sm border-0 animate-fade-in">
            <div class="card-body p-5">
              <h3 class="card-title mb-4 border-bottom pb-2">Project Context</h3>
              <p class="card-text">
                This is a full-stack application built with the <strong>ABP Framework</strong>.
              </p>
              <p class="card-text text-muted">
                I chose ABP Framework because it allows both backend and frontend to coexist in the same repository
                effectively. I've been revising it over the past month, and this project provided the perfect
                opportunity to apply my knowledge and demonstrate correct implementation patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Technical Stack Section -->
  <section class="tech-stack-section py-5">
    <div class="container">
      <h3 class="text-center mb-5 animate-fade-in">Technical Stack</h3>
      <div class="row justify-content-center g-4">

        <!-- .NET Core -->
        <div class="col-md-4 col-sm-6 animate-fade-in delay-100">
          <div class="tech-card text-center p-4 h-100 border rounded shadow-sm hover-lift">
            <div class="icon-wrapper mb-3 text-primary">
              <i class="fas fa-code fa-3x"></i>
            </div>
            <h5 class="fw-bold">.NET 10</h5>
            <p class="small text-muted mb-0">High-performance backend API</p>
          </div>
        </div>

        <!-- Angular -->
        <div class="col-md-4 col-sm-6 animate-fade-in delay-150">
          <div class="tech-card text-center p-4 h-100 border rounded shadow-sm hover-lift">
            <div class="icon-wrapper mb-3 text-danger">
              <i class="fab fa-angular fa-3x"></i>
            </div>
            <h5 class="fw-bold">Angular</h5>
            <p class="small text-muted mb-0">Modern, responsive frontend</p>
          </div>
        </div>

        <!-- PostgreSQL -->
        <div class="col-md-4 col-sm-6 animate-fade-in delay-200">
          <div class="tech-card text-center p-4 h-100 border rounded shadow-sm hover-lift">
            <div class="icon-wrapper mb-3 text-info">
              <i class="fas fa-database fa-3x"></i>
            </div>
            <h5 class="fw-bold">PostgreSQL</h5>
            <p class="small text-muted mb-0">Reliable relational database</p>
          </div>
        </div>

        <!-- ABP Framework -->
        <div class="col-md-4 col-sm-6 animate-fade-in delay-250">
          <div class="tech-card text-center p-4 h-100 border rounded shadow-sm hover-lift">
            <div class="icon-wrapper mb-3 text-warning">
              <i class="fas fa-layer-group fa-3x"></i>
            </div>
            <h5 class="fw-bold">ABP Framework</h5>
            <p class="small text-muted mb-0">Modular application infrastructure</p>
          </div>
        </div>

        <!-- Docker -->
        <div class="col-md-4 col-sm-6 animate-fade-in delay-300">
          <div class="tech-card text-center p-4 h-100 border rounded shadow-sm hover-lift">
            <div class="icon-wrapper mb-3 text-primary">
              <i class="fab fa-docker fa-3x"></i>
            </div>
            <h5 class="fw-bold">Docker</h5>
            <p class="small text-muted mb-0">Containerization & Deployment</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</div>
  `,
  styles: [`
    .landing-page {
      font-family: 'Inter', sans-serif; /* Example font */
    }
    .hero-section {
      background-color: #fff;
    }
    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
    }
    .icon-wrapper {
      /* Add more specific styling if needed */
    }
    /* Simple Animation Support */
    .animate-fade-in { animation: fadeIn 1s ease-out; }
    .animate-fade-in-down { animation: fadeInDown 1s ease-out; }
    .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class LandingComponent {}
