"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "AMPForge2",
    tag: "Bioinformatics",
    tagColor: "#7ae8c9",
    year: "09/2025",
    status: null,
    desc: "Generative deep learning model for de novo antimicrobial peptide design using a transformer architecture. Bridges CS and biology to tackle antibiotic resistance — learning sequence patterns from known AMPs to generate novel, therapeutically viable candidates.",
    metrics: [
      { label: "Task", value: "De Novo" },
      { label: "Arch", value: "Transformer" },
    ],
    stack: ["PyTorch", "Jupyter", "BioPython", "Transformers"],
    link: "https://github.com/ColeAndrae/AMPForge2",
  },
  {
    id: "02",
    title: "SIGNAL",
    tag: "Multi-Agent RL",
    tagColor: "#e87a9f",
    year: "03/2026",
    status: null,
    desc: "Emergent Language for Multi-Agent Crisis Triage — a reinforcement learning system where autonomous agents develop communication protocols to coordinate real-time crisis response.",
    metrics: [
      { label: "Agents", value: "4" },
      { label: "Method", value: "MAPPO" },
    ],
    stack: ["PyTorch", "MAPPO", "ICM", "Python"],
    link: "https://github.com/ColeAndrae/project-signal",
  },
  {
    id: "03",
    title: "Chess Engine",
    tag: "Systems / C++",
    tagColor: "#a78be8",
    year: "01/2026",
    status: null,
    desc: "High-performance chess engine written from scratch in C++ — no AI copilot shortcuts. Implements bitboard representations, alpha-beta pruning with iterative deepening, and move ordering heuristics to maximize search speed and play strength.",
    metrics: [
      { label: "Language", value: "C++" },
      { label: "Focus", value: "Perf" },
    ],
    stack: ["C++", "Bitboards", "Alpha-Beta", "MinMax"],
    link: "https://github.com/ColeAndrae/chess-engine",
  },
  {
    id: "04",
    title: "MEDUSA",
    tag: "Computer Vision",
    tagColor: "#7aade8",
    year: "08/2025",
    status: null,
    desc: "Convolutional Neural Network trained to classify X-rays and CT scans. Applies deep learning to diagnostic radiology — automating detection and classification of abnormalities from medical imaging data to assist clinical decision-making.",
    metrics: [
      { label: "Type", value: "CNN" },
      { label: "Domain", value: "Medical AI" },
    ],
    stack: ["PyTorch", "NumPy", "OpenCV", "Pillow"],
    link: "https://github.com/ColeAndrae/MEDUSA",
  },
  {
    id: "05",
    title: "TensorGrad",
    tag: "In Progress",
    tagColor: "#ff9f5a",
    year: "02/2026",
    status: "in-progress",
    desc: "Building a deep learning framework from scratch — implementing autograd, tensor operations, and common layer types without PyTorch or TensorFlow. A ground-up exploration of how modern ML frameworks actually work under the hood.",
    metrics: [
      { label: "Status", value: "WIP" },
      { label: "Type", value: "Framework" },
    ],
    stack: ["Python", "NumPy", "CUDA", "C++"],
    link: "https://github.com/ColeAndrae/tensorgrad",
  },
  {
    id: "06",
    title: "Reinforcement Learning Blog",
    tag: "Education / RL",
    tagColor: "#e8c97a",
    year: "01/2026",
    status: null,
    desc: "A hands-on technical blog series exploring reinforcement learning from first principles. Covers core algorithms — Q-learning, policy gradients, PPO — with implemented examples and visual explanations to make RL intuitive and accessible.",
    metrics: [
      { label: "Format", value: "Blog" },
      { label: "Topic", value: "RL" },
    ],
    stack: ["Python", "Jupyter", "Matplotlib", "Gym"],
    link: "https://github.com/ColeAndrae/reinforcement-learning",
  },
];

const SKILLS = [
  { name: "Machine Learning & Deep Learning", level: 90, color: "#e8c97a" },
  { name: "Python / PyTorch / TensorFlow", level: 88, color: "#7aade8" },
  {
    name: "Bioinformatics & Computational Biology",
    level: 82,
    color: "#7ae8c9",
  },
  { name: "TypeScript / JavaScript / React", level: 85, color: "#a78be8" },
  { name: "C++ & Systems Programming", level: 78, color: "#e87a9f" },
  { name: "Computer Vision & Medical Imaging", level: 80, color: "#e8c97a" },
];

const TIMELINE = [
  {
    role: "AI/ML Software Engineer Intern",
    org: "Electronic Arts — QVS Team",
    period: "May – Dec 2026",
    location: "Vancouver, BC",
    color: "#e8c97a",
    desc: "Incoming 8-month intern on the Quality, Validation & Standards team. Building AI/ML tooling to improve game quality pipelines.",
  },
  {
    role: "Machine Learning Researcher",
    org: "Michael Smith Laboratories",
    period: "Sep 2025 – Present",
    location: "Vancouver, BC",
    color: "#7ae8c9",
    desc: "Developing ML-based classification models for chemical compound identification using NMR spectroscopy. Building automated normalization pipelines for spectral data analysis and collaborating on computational chemistry research applications.",
  },
  {
    role: "BSc Integrated Sciences",
    org: "University of British Columbia",
    period: "2022 – Present",
    location: "Vancouver, BC",
    color: "#7aade8",
    desc: "Fourth-year student. Focus on ML, bioinformatics, and computational biology. Bridging software systems with life sciences.",
  },
];

// ─── DOUBLE PENDULUM OVERLAY ──────────────────────────────────────────────────
function DoublePendulumOverlay() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanupFn: (() => void) | null = null;

    const isMobile = window.innerWidth < 768;
    const N = isMobile ? 50 : 500;
    const L1 = 1.0,
      L2 = 1.0,
      M1 = 1.0,
      M2 = 1.0,
      G = 9.81;
    const BASE_THETA1 = Math.PI * 0.75;
    const BASE_THETA2 = Math.PI * 0.75;
    const OFFSET_RANGE = 0.0001;
    const DT = 0.005;
    const STEPS_PER_FRAME = 4;
    const Z_SPREAD = isMobile ? 1.0 : 2.0;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

    script.onload = () => {
      if (!mountRef.current) return;
      const THREE = (window as any).THREE;

      const states = new Float64Array(N * 4);
      for (let i = 0; i < N; i++) {
        const t = i / Math.max(N - 1, 1) - 0.5;
        states[i * 4] = BASE_THETA1 + t * 2 * OFFSET_RANGE;
        states[i * 4 + 1] = 0;
        states[i * 4 + 2] = BASE_THETA2 + t * 2 * OFFSET_RANGE * 0.5;
        states[i * 4 + 3] = 0;
      }

      function derivs(th1: number, w1: number, th2: number, w2: number) {
        const dth = th1 - th2;
        const sinD = Math.sin(dth),
          cosD = Math.cos(dth);
        const den = 2 * M1 + M2 - M2 * Math.cos(2 * dth);
        const a1 =
          (-G * (2 * M1 + M2) * Math.sin(th1) -
            M2 * G * Math.sin(th1 - 2 * th2) -
            2 * sinD * M2 * (w2 * w2 * L2 + w1 * w1 * L1 * cosD)) /
          (L1 * den);
        const a2 =
          (2 *
            sinD *
            (w1 * w1 * L1 * (M1 + M2) +
              G * (M1 + M2) * Math.cos(th1) +
              w2 * w2 * L2 * M2 * cosD)) /
          (L2 * den);
        return [w1, a1, w2, a2];
      }

      function stepRK4(i: number) {
        const b = i * 4;
        const th1 = states[b],
          w1 = states[b + 1],
          th2 = states[b + 2],
          w2 = states[b + 3];
        const k1 = derivs(th1, w1, th2, w2);
        const k2 = derivs(
          th1 + (DT / 2) * k1[0],
          w1 + (DT / 2) * k1[1],
          th2 + (DT / 2) * k1[2],
          w2 + (DT / 2) * k1[3],
        );
        const k3 = derivs(
          th1 + (DT / 2) * k2[0],
          w1 + (DT / 2) * k2[1],
          th2 + (DT / 2) * k2[2],
          w2 + (DT / 2) * k2[3],
        );
        const k4 = derivs(
          th1 + DT * k3[0],
          w1 + DT * k3[1],
          th2 + DT * k3[2],
          w2 + DT * k3[3],
        );
        states[b] = th1 + (DT / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
        states[b + 1] = w1 + (DT / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
        states[b + 2] =
          th2 + (DT / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
        states[b + 3] = w2 + (DT / 6) * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]);
      }

      const W = mount.clientWidth;
      const H = mount.clientHeight;

      const scene = new THREE.Scene();
      const FOV = 60;
      const camera = new THREE.PerspectiveCamera(FOV, W / H, 0.1, 100);

      // Compute camera Z so the full pendulum swing (±2.3 units) is always visible
      function getCameraZ(aspect: number) {
        const hExtentNeeded = 2.5; // half-width to keep visible
        const minZ =
          hExtentNeeded / (Math.tan(((FOV / 2) * Math.PI) / 180) * aspect);
        return Math.max(minZ, 4.5);
      }

      const initZ = getCameraZ(W / H);
      camera.position.set(0, 0.8, initZ);
      camera.lookAt(0, -0.5, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.NoToneMapping;

      // ── KEY FIX: absolutely position the canvas inside the fixed container
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      // Minimal lighting — the Fresnel shader does most of the work
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const cylGeom = new THREE.CylinderGeometry(0.039, 0.039, 1, 12, 1);
      cylGeom.translate(0, 0.5, 0);

      const fresnelMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        vertexShader: [
          "varying vec3 vNormal;",
          "varying vec3 vViewDir;",
          "void main() {",
          "  mat4 inst = instanceMatrix;",
          "  vec4 mvPos = modelViewMatrix * inst * vec4(position, 1.0);",
          "  vNormal = normalize(normalMatrix * mat3(inst) * normal);",
          "  vViewDir = normalize(-mvPos.xyz);",
          "  gl_Position = projectionMatrix * mvPos;",
          "}",
        ].join("\n"),
        fragmentShader: [
          "varying vec3 vNormal;",
          "varying vec3 vViewDir;",
          "void main() {",
          "  float fresnel = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDir)));",
          "  float edge = pow(fresnel, 2.0);",
          "  vec3 col = vec3(0.22, 0.24, 0.30);",
          "  float alpha = edge * 0.90 + 0.04;",
          "  gl_FragColor = vec4(col * (0.5 + edge * 2.2), alpha);",
          "}",
        ].join("\n"),
      });

      const arm1 = new THREE.InstancedMesh(cylGeom, fresnelMat, N);
      const arm2 = new THREE.InstancedMesh(cylGeom, fresnelMat, N);
      arm1.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      arm2.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(arm1);
      scene.add(arm2);

      const jointMesh = new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        fresnelMat,
        N,
      );
      const bobMesh = new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.042, 12, 12),
        fresnelMat,
        N,
      );
      jointMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      bobMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(jointMesh);
      scene.add(bobMesh);

      const _m4 = new THREE.Matrix4();
      const _q = new THREE.Quaternion();
      const _up = new THREE.Vector3(0, 1, 0);
      const _dir = new THREE.Vector3();
      const _pos = new THREE.Vector3();
      const _scl = new THREE.Vector3();

      function setCyl(
        mesh: any,
        idx: number,
        x0: number,
        y0: number,
        z0: number,
        x1: number,
        y1: number,
        z1: number,
      ) {
        const dx = x1 - x0,
          dy = y1 - y0,
          dz = z1 - z0;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (len < 1e-6) {
          _m4.makeScale(0, 0, 0);
          mesh.setMatrixAt(idx, _m4);
          return;
        }
        _dir.set(dx / len, dy / len, dz / len);
        _q.setFromUnitVectors(_up, _dir);
        _pos.set(x0, y0, z0);
        _scl.set(1, len, 1);
        _m4.compose(_pos, _q, _scl);
        mesh.setMatrixAt(idx, _m4);
      }

      function setSph(mesh: any, idx: number, x: number, y: number, z: number) {
        _m4.makeTranslation(x, y, z);
        mesh.setMatrixAt(idx, _m4);
      }

      function animate() {
        rafRef.current = requestAnimationFrame(animate);
        for (let s = 0; s < STEPS_PER_FRAME; s++)
          for (let i = 0; i < N; i++) stepRK4(i);
        for (let i = 0; i < N; i++) {
          const b = i * 4;
          const th1 = states[b],
            th2 = states[b + 2];
          const z = (i / Math.max(N - 1, 1) - 0.5) * Z_SPREAD;
          const x1 = L1 * Math.sin(th1),
            y1 = -L1 * Math.cos(th1);
          const x2 = x1 + L2 * Math.sin(th2),
            y2 = y1 - L2 * Math.cos(th2);
          setCyl(arm1, i, 0, 0, z, x1, y1, z);
          setCyl(arm2, i, x1, y1, z, x2, y2, z);
          setSph(jointMesh, i, x1, y1, z);
          setSph(bobMesh, i, x2, y2, z);
        }
        arm1.instanceMatrix.needsUpdate = true;
        arm2.instanceMatrix.needsUpdate = true;
        jointMesh.instanceMatrix.needsUpdate = true;
        bobMesh.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
      }
      animate();

      const onResize = () => {
        const w = mount.clientWidth,
          h = mount.clientHeight;
        camera.aspect = w / h;
        camera.position.z = getCameraZ(w / h);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanupFn = () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement))
          mount.removeChild(renderer.domElement);
      };
    };

    document.head.appendChild(script);

    return () => {
      if (cleanupFn) cleanupFn();
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: mobile ? "relative" : "absolute",
        top: mobile ? undefined : 0,
        right: mobile ? undefined : 0,
        width: mobile ? "100%" : "50%",
        height: mobile ? "55vh" : "100%",
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
        marginTop: mobile ? "60px" : undefined,
        marginBottom: mobile ? "-60px" : undefined,
      }}
    />
  );
}

// ─── STARFIELD ────────────────────────────────────────────────────────────────
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.15,
      speed: Math.random() * 0.007 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame = 0;
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach((s) => {
        const a = 0.1 + 0.75 * Math.abs(Math.sin(frame * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,232,213,${a})`;
        ctx.fill();
      });
      frame++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.83,
      }}
    />
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "7px",
          fontSize: "11px",
          fontFamily: "'Space Mono'",
        }}
      >
        <span style={{ color: "var(--text)" }}>{name}</span>
        <span style={{ color }}>{level}%</span>
      </div>
      <div
        style={{
          height: "2px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: visible ? `${level}%` : "0%",
            background: color,
            borderRadius: "2px",
            transition: `width 1.3s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            boxShadow: `0 0 10px ${color}55`,
          }}
        />
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ p, index }: { p: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.13)" : "var(--border)"}`,
        borderRadius: "2px",
        padding: "32px",
        background: hovered ? "rgba(13,20,32,0.95)" : "rgba(8,12,18,0.75)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        overflow: "hidden",
        animation: `fadeUp 0.65s ease ${index * 110}ms both`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${p.tagColor}70, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "18px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono'",
            fontSize: "10px",
            color: "var(--muted)",
            letterSpacing: "0.15em",
          }}
        >
          {p.id} / {p.year}
        </span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {p.status === "in-progress" && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "'Space Mono'",
                fontSize: "9px",
                color: "#ff9f5a",
                letterSpacing: "0.1em",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#ff9f5a",
                  display: "inline-block",
                  animation: "pulse-ring 1.4s ease-out infinite",
                }}
              />
              WIP
            </span>
          )}
          <span
            style={{
              fontFamily: "'Space Mono'",
              fontSize: "9px",
              letterSpacing: "0.12em",
              padding: "3px 9px",
              border: `1px solid ${p.tagColor}50`,
              color: p.tagColor,
              borderRadius: "1px",
            }}
          >
            {p.tag}
          </span>
        </div>
      </div>
      <h3
        style={{
          fontSize: "clamp(20px, 2.5vw, 28px)",
          marginBottom: "14px",
          color: "var(--cream)",
          lineHeight: 1.15,
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "12px",
          lineHeight: 1.85,
          marginBottom: "24px",
        }}
      >
        {p.desc}
      </p>
      <div style={{ display: "flex", gap: "28px", marginBottom: "22px" }}>
        {p.metrics.map((m) => (
          <div key={m.label}>
            <div
              style={{
                fontSize: "16px",
                fontFamily: "'Cormorant Garamond'",
                color: p.tagColor,
                fontWeight: 300,
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "var(--muted)",
                letterSpacing: "0.1em",
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                fontSize: "10px",
                color: "var(--muted)",
                padding: "2px 8px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "1px",
                fontFamily: "'Space Mono'",
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Space Mono'",
            fontSize: "9px",
            color: p.tagColor,
            textDecoration: "none",
            letterSpacing: "0.12em",
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s",
          }}
        >
          VIEW →
        </a>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <Starfield />

      {/* Nebula BG */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('/nebula.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.54,
          filter: "saturate(0.5)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 90% 65% at 50% 50%, transparent 20%, var(--black) 100%)",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(20px, 5vw, 64px)",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(3,5,7,0.9)" : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div
          className="nav-logo"
          style={{
            fontFamily: "'Cormorant Garamond'",
            fontSize: "19px",
            fontWeight: 300,
            color: "var(--cream)",
            letterSpacing: "0.05em",
          }}
        >
          COLE<span style={{ color: "var(--amber)" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              {item.label.toUpperCase()}
            </a>
          ))}
        </div>
        <a
          className="nav-github"
          href="https://github.com/ColeAndrae"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Space Mono'",
            fontSize: "9px",
            letterSpacing: "0.12em",
            padding: "8px 18px",
            border: "1px solid var(--border-bright)",
            color: "var(--text)",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--amber)";
            el.style.color = "var(--amber)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--border-bright)";
            el.style.color = "var(--text)";
          }}
        >
          GITHUB
        </a>
      </nav>

      <main style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
        {/* HERO */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: isMobile ? "flex-start" : "center",
            padding: "0 clamp(24px, 8vw, 120px)",
            paddingTop: isMobile ? "120px" : "100px",
            paddingBottom: isMobile ? "0px" : undefined,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: "800px", animation: "fadeUp 1s ease both" }}>
            <div
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "var(--amber)",
                marginBottom: "28px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: "var(--amber)",
                }}
              />
              CS · UBC · INCOMING AI/ML @ EA
            </div>
            <h1
              style={{
                fontSize: "clamp(52px, 9vw, 108px)",
                lineHeight: 0.9,
                marginBottom: "32px",
                color: "var(--cream)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              Cole
              <br />
              <em style={{ color: "var(--muted)", fontStyle: "italic" }}>
                Andrae
              </em>
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--muted)",
                lineHeight: 1.9,
                maxWidth: "500px",
                marginBottom: "16px",
              }}
            >
              Fourth-year Computer Science and Biology student at UBC. I build
              ML systems that sit at the intersection of deep learning and the
              life sciences — from generative models for drug discovery to
              computer vision for medical imaging.
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--amber)",
                lineHeight: 1.9,
                maxWidth: "500px",
                marginBottom: "48px",
                fontFamily: "'Space Mono'",
                letterSpacing: "0.08em",
              }}
            >
              → Joining Electronic Arts (QVS Team) as an AI/ML SE Intern, May
              2026.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a
                href="#projects"
                style={{
                  fontFamily: "'Space Mono'",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  padding: "14px 32px",
                  background: "var(--amber)",
                  color: "var(--black)",
                  textDecoration: "none",
                  fontWeight: 700,
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--amber)";
                }}
              >
                VIEW PROJECTS
              </a>
              <a
                href="https://github.com/ColeAndrae"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Space Mono'",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  padding: "14px 32px",
                  border: "1px solid var(--border-bright)",
                  color: "var(--text)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--amber)";
                  el.style.color = "var(--amber)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-bright)";
                  el.style.color = "var(--text)";
                }}
              >
                GITHUB PROFILE
              </a>
            </div>
          </div>
          {/* Pendulum — right half on desktop, below text on mobile */}
          <DoublePendulumOverlay />
          <div
            style={{
              position: "absolute",
              bottom: "64px",
              right: "clamp(24px, 8vw, 120px)",
              display: isMobile ? "none" : "flex",
              gap: "44px",
              animation: "fadeIn 1.5s ease 0.6s both",
              zIndex: 5,
            }}
          >
            {[
              ["4th", "Year at UBC"],
              ["44+", "Repos"],
              ["EA", "Incoming"],
            ].map(([val, label]) => (
              <div key={label} style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond'",
                    fontSize: "34px",
                    color: "var(--cream)",
                    lineHeight: 1,
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono'",
                    fontSize: "9px",
                    color: "var(--muted)",
                    letterSpacing: "0.12em",
                    marginTop: "4px",
                  }}
                >
                  {String(label).toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          style={{ padding: "120px clamp(24px, 8vw, 120px)" }}
        >
          <div style={{ marginBottom: "64px" }}>
            <div
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "var(--amber)",
                marginBottom: "16px",
              }}
            >
              SELECTED WORK
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                color: "var(--cream)",
              }}
            >
              Projects
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "1px",
              background: "var(--border)",
            }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} />
            ))}
          </div>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <a
              href="https://github.com/ColeAndrae"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.2s",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "2px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--amber)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              SEE ALL REPOS ON GITHUB →
            </a>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          style={{ padding: "120px clamp(24px, 8vw, 120px)" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono'",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  color: "var(--amber)",
                  marginBottom: "16px",
                }}
              >
                EXPERTISE
              </div>
              <h2
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  color: "var(--cream)",
                  marginBottom: "40px",
                }}
              >
                Skills &amp;
                <br />
                <em style={{ color: "var(--muted)" }}>Tools</em>
              </h2>
              <p
                style={{
                  fontFamily: "'Space Mono'",
                  fontSize: "11px",
                  color: "var(--muted)",
                  lineHeight: 2,
                  marginBottom: "20px",
                }}
              >
                My unique combination of CS and Biology gives me an edge in ML
                applications for life sciences — from protein design to medical
                imaging.
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono'",
                  fontSize: "11px",
                  color: "var(--muted)",
                  lineHeight: 2,
                }}
              >
                Languages: Python · TypeScript · C++ · R · Java
                <br />
                ML: PyTorch · TensorFlow · scikit-learn · HuggingFace
                <br />
                Bio: BioPython · RDKit · BLAST · UCSC Genome Browser
                <br />
                Tools: Git · Docker · Jupyter · AWS · GCP
              </p>
            </div>
            <div>
              {SKILLS.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          style={{ padding: "120px clamp(24px, 8vw, 120px)" }}
        >
          <div style={{ marginBottom: "64px" }}>
            <div
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "var(--amber)",
                marginBottom: "16px",
              }}
            >
              BACKGROUND
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                color: "var(--cream)",
              }}
            >
              Experience
            </h2>
          </div>
          <div
            style={{
              maxWidth: "720px",
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: "var(--border)",
            }}
          >
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "36px 40px",
                  background: "rgba(8,12,18,0.8)",
                  borderLeft: `3px solid ${item.color}`,
                  transition: "background 0.2s",
                  animation: `fadeUp 0.65s ease ${i * 150}ms both`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(13,20,32,0.95)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(8,12,18,0.8)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "22px",
                        color: "var(--cream)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.role}
                    </h3>
                    <div
                      style={{
                        fontFamily: "'Space Mono'",
                        fontSize: "11px",
                        color: item.color,
                      }}
                    >
                      {item.org}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "'Space Mono'",
                        fontSize: "10px",
                        color: "var(--amber)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.period}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono'",
                        fontSize: "9px",
                        color: "var(--muted)",
                        marginTop: "3px",
                      }}
                    >
                      {item.location}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Space Mono'",
                    fontSize: "11px",
                    color: "var(--muted)",
                    lineHeight: 1.9,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          style={{
            padding: "120px clamp(24px, 8vw, 120px) 160px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(232,201,122,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "var(--amber)",
                marginBottom: "24px",
              }}
            >
              GET IN TOUCH
            </div>
            <h2
              style={{
                fontSize: "clamp(40px, 7vw, 84px)",
                color: "var(--cream)",
                marginBottom: "24px",
                lineHeight: 0.95,
              }}
            >
              Let's connect
              <br />
              <em style={{ color: "var(--muted)" }}>&amp; build</em>
            </h2>
            <p
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "11px",
                color: "var(--muted)",
                maxWidth: "380px",
                margin: "0 auto 48px",
                lineHeight: 1.9,
              }}
            >
              Open to research collaborations, internship conversations, and
              interesting ML projects — especially at the intersection of AI and
              biology.
            </p>
            <a
              href="https://github.com/ColeAndrae"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Space Mono'",
                fontSize: "11px",
                letterSpacing: "0.15em",
                padding: "18px 48px",
                border: "1px solid var(--amber)",
                color: "var(--amber)",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.25s",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--amber)";
                el.style.color = "var(--black)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "var(--amber)";
              }}
            >
              VIEW GITHUB PROFILE
            </a>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "36px",
                marginTop: "64px",
              }}
            >
              {[
                { label: "GitHub", href: "https://github.com/ColeAndrae" },
                { label: "UBC", href: "#" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/cole-andrae/",
                },
                { label: "Email", href: "mailto:cole@theandraes.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Space Mono'",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--cream)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  {label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "24px clamp(24px, 8vw, 120px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono'",
              fontSize: "9px",
              color: "var(--muted)",
              letterSpacing: "0.1em",
            }}
          >
            © 2026 COLE ANDRAE
          </span>
          <span
            style={{
              fontFamily: "'Space Mono'",
              fontSize: "9px",
              color: "var(--muted)",
              letterSpacing: "0.1em",
            }}
          >
            UBC · VANCOUVER, BC
          </span>
        </footer>
      </main>
    </>
  );
}
