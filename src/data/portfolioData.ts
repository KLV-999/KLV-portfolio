export interface ProjectItem {
  id: string; // e.g. "#NEXUS_VALKYRIE"
  serial: string; // e.g. "SERIAL UNIT: 001-KLV"
  title: string;
  category: 'HACKATHONS' | 'ROBOTICS' | 'DRONES' | 'SOFTWARE PROJECTS';
  description: string;
  extendedTelemetry: {
    architecture: string;
    controller: string;
    powerSystem: string;
    sensors: string;
    communication: string;
  };
  stats: {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
  };
  demoUrl?: string;
  githubUrl?: string;
}

export interface PortfolioData {
  developerName: string;
  logoText: string;
  tagline: string;
  subDescription: string;
  telemetry: {
    orbitAltitude: string;
    latency: string;
    signalStrength: string;
  };
  bio: {
    title: string;
    text: string;
    institution: string;
    location: string;
    coordinates: string;
    focusList: string[];
  };
  diagnostics: Array<{
    name: string;
    status: string;
    isOnline: boolean;
  }>;
  socials: Array<{
    name: string;
    url: string;
    iconName: 'mail' | 'linkedin' | 'github' | 'instagram' | 'youtube' | 'facebook';
  }>;
  projects: ProjectItem[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  developerName: "Lohith",
  logoText: "KLV",
  tagline: "Where circuits dream and machines learn to move.",
  subDescription: "Engineering the boundary between intelligence and motion. Explore an index of autonomous robotics, drone systems, and AI-driven builds.",
  
  telemetry: {
    orbitAltitude: "14.2K KM",
    latency: "8ms",
    signalStrength: "99.4%"
  },

  bio: {
    title: "I MAY DO THESE",
    text: "CSE student passionate about autonomous robotics, embedded AI, and flight dynamics. Specialized in physical computing, sensor fusion, and high-torque motor actuators.",
    institution: "Lovely Professional University",
    location: "Punjab, India",
    coordinates: "31.2536° N, 75.7037° E",
    focusList: [
      "Hackathons & Rapid Prototyping",
      "Python, ML & Computer Vision",
      "Soft Robotics & Kinematics",
      "BLDC & Drone Engineering"
    ]
  },

  diagnostics: [
    { name: "PORT_3000", status: "ONLINE", isOnline: true },
    { name: "NODE_SERVER", status: "STANDBY", isOnline: true },
    { name: "NEURAL_ENGINE", status: "OPTIMAL", isOnline: true },
    { name: "SSL_CERT", status: "SECURE", isOnline: true },
  ],

  socials: [
    { name: "Email", url: "mailto:lohith.klv@example.com", iconName: "mail" },
    { name: "LinkedIn", url: "https://linkedin.com", iconName: "linkedin" },
    { name: "GitHub", url: "https://github.com", iconName: "github" },
    { name: "Instagram", url: "https://instagram.com", iconName: "instagram" },
    { name: "YouTube", url: "https://youtube.com", iconName: "youtube" },
    { name: "Facebook", url: "https://facebook.com", iconName: "facebook" },
  ],

  projects: [
    {
      id: "#NEXUS_VALKYRIE",
      serial: "SERIAL UNIT: 001-KLV",
      title: "Valkyrie Quadruped Biped Rover",
      category: "ROBOTICS",
      description: "Autonomous quadruped robotics platform with real-time inverse kinematics, terrain estimation, and active obstacle avoidance.",
      extendedTelemetry: {
        architecture: "STM32 H7 Dual-Core + Jetson Orin Nano",
        controller: "Custom FOC Brushless Servo Matrix",
        powerSystem: "6S LiPo 22.2V High-Discharge",
        sensors: "Solid-State LiDAR + 9-DOF IMU array",
        communication: "2.4GHz Low-Latency Mesh Telemetry"
      },
      stats: {
        label1: "CORE PROCESSOR",
        value1: "Q-Mesh Neural Sys",
        label2: "ACTUATOR TORQUE",
        value2: "850 Nm Peak"
      },
      githubUrl: "https://github.com"
    },
    {
      id: "#AERO_PHANTOM",
      serial: "SERIAL UNIT: 002-KLV",
      title: "Phantom Swarm Recon Drone",
      category: "DRONES",
      description: "Ultra-compact autonomous reconnaissance quadcopter featuring vision-based GPS-denied navigation and swarm synchronization.",
      extendedTelemetry: {
        architecture: "PX4 Autopilot + Custom Edge AI Board",
        controller: "ArduPilot / Custom Swarm Protocol",
        powerSystem: "4S 18650 Li-ion Custom Pack",
        sensors: "Dual Optical Flow + ToF Distance Sensor",
        communication: "LoRa 915MHz Telemetry Link"
      },
      stats: {
        label1: "MAX SPEED",
        value1: "95 KM/H",
        label2: "FLIGHT RANGE",
        value2: "18.5 KM Radius"
      },
      githubUrl: "https://github.com"
    },
    {
      id: "#CYBER_SYNAPSE",
      serial: "SERIAL UNIT: 003-KLV",
      title: "Synapse AI Edge Accelerator",
      category: "HACKATHONS",
      description: "Award-winning hackathon prototype running sub-millisecond edge computer vision for high-speed manufacturing defect classification.",
      extendedTelemetry: {
        architecture: "FPGA-Accelerated Tensor Engine",
        controller: "Rust Runtime / PyTorch C++ API",
        powerSystem: "12V DC Regulated Bus",
        sensors: "120FPS Industrial Global Shutter Camera",
        communication: "GigE Vision / WebSocket Protocol"
      },
      stats: {
        label1: "INFERENCE TIME",
        value1: "1.4 ms / Frame",
        label2: "ACCURACY",
        value2: "99.82% Top-1"
      },
      demoUrl: "https://example.com"
    },
    {
      id: "#QUANTUM_GRIP",
      serial: "SERIAL UNIT: 004-KLV",
      title: "Pneumatic Soft Robotic Gripper",
      category: "ROBOTICS",
      description: "Bio-inspired soft robotic end effector utilizing fluidic elastomer actuators and capacitive tactile feedback sensing.",
      extendedTelemetry: {
        architecture: "Closed-Loop Pneumatic Manifold",
        controller: "Micro-Solenoid PWM Matrix",
        powerSystem: "Dual-Piston Micro-Compressor 24V",
        sensors: "Piezoresistive Strain Gauge Array",
        communication: "CAN Bus 2.0B Interface"
      },
      stats: {
        label1: "GRIP FORCE",
        value1: "120 N Adaptive",
        label2: "PAYLOAD FREQ",
        value2: "50 Hz Closed-Loop"
      },
      githubUrl: "https://github.com"
    },
    {
      id: "#HYPER_VORTEX",
      serial: "SERIAL UNIT: 005-KLV",
      title: "Vortex BLDC Thrust Vector Unit",
      category: "DRONES",
      description: "High-efficiency ducted fan propulsion module with 2-axis servo thrust vectoring for VTOL transition aircraft.",
      extendedTelemetry: {
        architecture: "Carbon Fiber Composite Duct",
        controller: "Field-Oriented Control (FOC) ESC",
        powerSystem: "8S HV-LiPo High Thrust",
        sensors: "Hall Effect Current & Temp Telemetry",
        communication: "PWM / DShot1200 Protocol"
      },
      stats: {
        label1: "PEAK THRUST",
        value1: "4.8 kgf",
        label2: "RESPONSE LATENCY",
        value2: "3 ms Servo Response"
      },
      githubUrl: "https://github.com"
    },
    {
      id: "#CHRONO_CORE",
      serial: "SERIAL UNIT: 006-KLV",
      title: "Chrono Autonomous Pathfinding Suite",
      category: "SOFTWARE PROJECTS",
      description: "Real-time 3D Occupancy Grid mapping and ROS2 path planning engine built for dynamic subterranean environments.",
      extendedTelemetry: {
        architecture: "C++20 / ROS2 Humble / CUDA 12",
        controller: "Model Predictive Path Integral (MPPI)",
        powerSystem: "Software Telemetry Layer",
        sensors: "Point Cloud 3D OctoMap Integration",
        communication: "gRPC / ROS2 DDS Bridge"
      },
      stats: {
        label1: "MAP RESOLUTION",
        value1: "0.05 m Voxel",
        label2: "UPDATE FREQ",
        value2: "60 Hz Realtime"
      },
      githubUrl: "https://github.com"
    }
  ]
};
