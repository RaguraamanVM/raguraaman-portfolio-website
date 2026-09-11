// ────────────────────────────────────────────────────────────
// All portfolio content lives here. Edit freely — nothing else
// in the codebase needs to change when you update this file.
// ────────────────────────────────────────────────────────────

export const profile = {
  name: 'Raguraaman V M',
  role: 'Aspiring DevOps Engineer',
  tagline: 'I design infrastructure that heals itself before you wake up.',
  location: 'Chennai, India',
  email: 'vm.raguraaman@gmail.com',
  github: 'https://github.com/RaguraamanVM',
  linkedin: 'https://www.linkedin.com/in/raguraaman/',
  resume: `${import.meta.env.BASE_URL}Raguraaman_Resume.pdf`,
  avatar: `${import.meta.env.BASE_URL}profile.jpg`,
  initials: 'RR',
};

// Rotates through the terminal panel in the hero.
export const terminalLines = [
  { cmd: 'kubectl get raguraaman -o wide', out: 'NAME          STATUS    ROLE             UPTIME\nraguraaman    Running   DevOps Engineer  24/7' },
  { cmd: 'kubectl rollout status deploy/career', out: 'Currently looking for DevOps oppurtunities!' },
  { cmd: 'git push origin main', out: 'learn → build → deploy → repeat\n✔ 4 stages passed in 42s' },
  { cmd: 'terraform apply -auto-approve', out: 'Plan: 10 to add, 0 to change, 0 to destroy.\nApply complete! Resources: 10 added.' },
];

// Short "manifest" facts shown in the About section.
export const aboutManifest = [
  { key: 'degree', value: 'B.E. Electronics & Communication Engineering' },
  { key: 'graduated', value: '2025' },
  { key: 'cgpa', value: '8.26 / 10' },
  { key: 'location', value: 'Chennai, India' },
];

export const aboutBio =
  "I’m a DevOps-focused engineer with an Electronics and Communication background, building my career around cloud infrastructure, automation, containers, and reliable software delivery." +  
  "          I enjoy understanding how systems work, troubleshooting problems, and turning repetitive manual tasks into automated workflows." +
"          My hands-on journey spans Linux, AWS, Docker, Kubernetes, Terraform, Jenkins, and CI/CD, with a growing focus on DevSecOps, GitOps, observability, and cloud-native technologies." + 
	"                 My previous experience in functional testing and failure-log analysis taught me to approach problems systematically — a mindset I now bring into DevOps.";

// Grouped as "node pools" — each pool is a category of the stack.
export const skillPools = [
  {
    id: 'cloud',
    label: 'Cloud Platforms',
    kind: 'Infrastructure',
    tools: ['AWS'],
  },
  {
    id: 'containers',
    label: 'Containers & Orchestration',
    kind: 'Workloads',
    tools: ['Docker', 'Kubernetes', 'Helm'],
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    kind: 'Pipelines',
    tools: ['Jenkins','ArgoCD','AWS CodeBuild', 'AWS CodePipeline'],
  },
  {
    id: 'iac',
    label: 'Infrastructure as Code',
    kind: 'Provisioning',
    tools: ['Terraform', 'Cloud Formation'],
  },
  {
    id: 'observability',
    label: 'Observability',
    kind: 'Monitoring',
    tools: ['Prometheus', 'Grafana', 'AWS CloudWatch'],
  },
  {
    id: 'scripting',
    label: 'Scripting & Automation',
    kind: 'Automation',
    tools: ['Bash', 'Ansible', 'Python'],
  },
];

// Deployment log / journey timeline. Replace with your real history —
// each entry is styled like a pipeline stage, oldest at the bottom.
export const journey = [
  {
    stage: 'deploy',
    status: 'passed',
    title: 'Graduate Engineer Trainee',
    org: 'Flextronics Technologies (India) Private Limited',
    period: 'Jun 2025 - Jan 2026',
    notes: [
      'Supported NPI for Cisco Nexus data-center switches by executing functional tests, validating production test infrastructure, and qualifying manufacturing test systems.',
      'Performed failure log analysis and Root Cause Analysis (RCA) to troubleshoot test failures and identify recurring issues across different switch models.',
      'Monitored manufacturing yield and First Pass Yield (FPY), supporting quality targets ranging from 86%–94% during mass production.',
    ],
  },
];

// "Deployed services" — your project cards. Replace with real repos.
export const projects = [

    {                                          	                                                                                                           name: 'end-to-end-devsecops-pipeline',                                                                                                              status: 'building',                                                                                                                                description:                                                                                                                                          'Building an end-to-end DevSecOps CI/CD pipeline that integrates source control, continuous integration, code quality analysis, container security scanning, image publishing, and GitOps-based deployment to Amazon EKS.',
    stack: [
      'Jenkins',
      'SonarQube',
      'Docker',
      'Trivy',
      'Argo CD',
      'AWS EKS'],
    github: '#',
    live: null,
  },

  {
    name: 'aws-eks-deployment-automation',
    status: 'running',
    description:
      'An automated AWS EKS deployment pipeline using Terraform and Jenkins to provision cloud infrastructure, build and publish container images, deploy a React application to Kubernetes, and monitor workloads with Prometheus and Grafana.',
    stack: ['AWS','EKS','Terraform',
      'Jenkins',
      'Docker',
      'Kubernetes',
      'Prometheus',
      'Grafana'],
    github: 'https://github.com/RaguraamanVM/trendstore-devops-cicd-pipeline',
    live: null,
  },
  {
    name: 'ci/cd-pipeline-containerized-e-commerce-application',
    status: 'running',
    description:
      'An end-to-end CI/CD workflow for a containerized e-commerce application using Jenkins, GitHub, Docker, Docker Hub, and Docker Compose, with automated monitoring and alerting for infrastructure and containers.',
    stack: ['Jenkins',
      'Docker',
      'Prometheus',
      'Grafana',
      'Node Exporter',
      'cAdvisor',
      'Alertmanager'],
    github: 'https://github.com/RaguraamanVM/E-commerce-app-Devops-cicd-pipeline.git',
    live: null,
  },
  {
    name: 'aws-native-cicd-eks-deployment',
    status: 'running',
    description:
      'A cloud-native CI/CD pipeline using AWS CodePipeline and CodeBuild to automate application builds, Docker image creation, Docker Hub publishing, and Kubernetes deployment on Amazon EKS.',
    stack: ['AWS CodePipeline',
      'AWS CodeBuild',
      'Docker',
      'Kubernetes',
      'Amazon EKS'],
    github: 'https://github.com/RaguraamanVM/Mindtrack-app-cicd-pipeline',
    live: null,
  },
];
