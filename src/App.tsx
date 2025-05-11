// App.tsx
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// window as any

declare global {
  interface Window {
    gtag: (type: string, event: string, params: Record<string, unknown>) => void;
  }
}

const audios = [
  {
    name: "Mente en blanco",
    file: "/audios/mente_en_blanco.mp3",
    description: "Ruido de silencio agudo y suave (no apto para todos)",
  },
  {
    name: "Hipnosis para sueños",
    file: "/audios/suenos.mp3",
    description: "Hipnosis guiada para recordar sueños",

  },
];

const trackClick = (label: string) => {
  if (window.gtag) {
    window.gtag("event", "click", {
      event_category: "audio_download",
      event_label: label,
    });
  }
};

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: {
        color: { value: "#000000" },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: false, mode: "push" },
          onHover: { enable: false, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: ["#00ffff", "#ff00ff", "#ffffff"] },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: MoveDirection.outside,
          enable: true,
          outModes: { default: OutMode.out },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 200,
        },
        opacity: { value: 0.3 },
        shape: { type: ["circle"] },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 1,
            startValue: "min",
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <div className="relative w-screen h-screen  text-white overflow-y-auto">
      <Helmet>
        <title>Vacío Mental | Hipnosis y Silencio</title>
        <meta
          name="description"
          content="Audios gratuitos de hipnosis guiada y silencio mental."
        />
      </Helmet>

      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />

      <main className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <img src="/favicon/favicon.svg"
          alt="Vacío Mental" className="w-32 -mt-6 opacity-90" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          
          Vacío Mental</h1>
        <p className="text-lg md:text-xl mb-10 max-w-xl">
          Sé que este fondo puede ser hipnótico... pero no te vayas a quedar atrapado demasiado tiempo.
        </p>



        <p className="text-lg md:text-xl mb-10 max-w-xl">
          Aquí tienes algunos audios gratuitos de hipnosis guiada y silencio mental.
          Puedes descargarlos y usarlos como quieras.

        </p>

        <section className="space-y-4 w-full max-w-md">
          {audios.map((audio) => (
            <a
              key={audio.file}
              href={audio.file}
              download
              onClick={() => trackClick(audio.name)}
              className="block bg-white/10 border border-white/20 hover:bg-white/20 transition-all p-4 rounded-xl backdrop-blur-sm"
            >
              {audio.name}
              <span className="text-xs opacity-50 block mt-1">
                {audio.description}
              </span>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
