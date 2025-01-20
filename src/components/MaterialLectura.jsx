import { useState } from 'react';
import useStore from '../store';

const lecturas = [
  {
    titulo: "El Viaje a Casa",
    contenido: `María caminaba lentamente por la calle vacía, observando cómo las hojas otoñales danzaban con el viento. El cielo estaba teñido de naranja y púrpura mientras el sol se ponía en el horizonte. Había sido un largo día en la escuela, y aunque estaba cansada, disfrutaba de este momento tranquilo.`,
    preguntas: {
      comprension: [
        {
          pregunta: "¿En qué momento del día transcurre la historia?",
          opciones: ["Al amanecer", "Al atardecer", "Al mediodía", "En la noche"],
          correcta: 1
        }
      ],
      vocabulario: [
        {
          pregunta: "¿Qué significa 'ronronear'?",
          opciones: [
            "Sonido que hace el gato cuando está contento",
            "Sonido de enojo",
            "Sonido de miedo",
            "Sonido de hambre"
          ],
          correcta: 0
        }
      ],
      pensamiento_critico: [
        {
          pregunta: "¿Por qué crees que María decidió llevar el gato a casa?",
          opciones: [
            "Por compasión y responsabilidad",
            "Por impulso momentáneo",
            "Por presión social",
            "Por aburrimiento"
          ],
          correcta: 0
        }
      ]
    }
  },
  {
    titulo: "El Método Científico",
    contenido: `El método científico es una forma sistemática y rigurosa de investigar fenómenos naturales y sociales. Este proceso permite a los científicos obtener conocimientos confiables y verificables sobre el mundo que nos rodea.`,
    preguntas: {
      comprension: [
        {
          pregunta: "¿Cuál es el primer paso del método científico?",
          opciones: [
            "Formular hipótesis",
            "Realizar experimentos",
            "La observación",
            "Analizar datos"
          ],
          correcta: 2
        }
      ],
      vocabulario: [
        {
          pregunta: "¿Qué significa 'sistemático'?",
          opciones: [
            "Que sigue un método ordenado",
            "Que es aleatorio",
            "Que es complejo",
            "Que es simple"
          ],
          correcta: 0
        }
      ],
      pensamiento_critico: [
        {
          pregunta: "¿Por qué es importante seguir un método en la investigación científica?",
          opciones: [
            "Para obtener resultados confiables y verificables",
            "Para hacer el proceso más largo",
            "Para complicar la investigación",
            "Para usar más recursos"
          ],
          correcta: 0
        }
      ]
    }
  }
];

export default function MaterialLectura() {
  const [seccionActual, setSeccionActual] = useState('comprension');
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [lecturaCompletada, setLecturaCompletada] = useState(false);
  const [respuestas, setRespuestas] = useState([]);
  
  const { lecturaActual, setLecturaActual, actualizarProgreso } = useStore();

  const lectura = lecturas[lecturaActual];
  const preguntas = lectura.preguntas[seccionActual];
  const pregunta = preguntas[preguntaActual];

  const handleRespuesta = (index) => {
    const esCorrecta = pregunta.correcta === index;
    setRespuestaCorrecta(esCorrecta);
    setMostrarFeedback(true);

    setRespuestas([...respuestas, {
      seccion: seccionActual,
      pregunta: pregunta.pregunta,
      respuesta: pregunta.opciones[index],
      correcta: esCorrecta
    }]);

    if (esCorrecta) {
      actualizarProgreso(seccionActual, Math.min(100, Math.random() * 20 + 80));
    }

    setTimeout(() => {
      setMostrarFeedback(false);
      if (preguntaActual < preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1);
      } else if (seccionActual === 'comprension') {
        setSeccionActual('vocabulario');
        setPreguntaActual(0);
      } else if (seccionActual === 'vocabulario') {
        setSeccionActual('pensamiento_critico');
        setPreguntaActual(0);
      } else {
        setLecturaCompletada(true);
      }
    }, 1500);
  };

  const pasarSiguienteLectura = () => {
    setLecturaActual((lecturaActual + 1) % lecturas.length);
    setSeccionActual('comprension');
    setPreguntaActual(0);
    setMostrarFeedback(false);
    setLecturaCompletada(false);
    setRespuestas([]);
  };

  if (lecturaCompletada) {
    const correctas = respuestas.filter(r => r.correcta).length;
    const porcentaje = Math.round((correctas / respuestas.length) * 100);

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">¡Lectura Completada!</h2>
        
        <div className="mb-6">
          <div className="text-xl mb-2">
            Puntuación: <span className="font-bold text-blue-600">{porcentaje}%</span>
          </div>
          <div className="text-gray-600">
            Respondiste correctamente {correctas} de {respuestas.length} preguntas
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Resumen de respuestas:</h3>
          <div className="space-y-4">
            {respuestas.map((r, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg ${
                  r.correcta ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="font-medium mb-2">{r.pregunta}</div>
                <div className="text-sm mb-2">Tu respuesta: {r.respuesta}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={pasarSiguienteLectura}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Siguiente lectura
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{lectura.titulo}</h2>
      
      <div className="prose max-w-none mb-6">
        {lectura.contenido.split('\n\n').map((parrafo, i) => (
          <p key={i} className="mb-4">{parrafo}</p>
        ))}
      </div>

      <div className="flex space-x-4 mb-6">
        {['comprension', 'vocabulario', 'pensamiento_critico'].map((seccion) => (
          <span
            key={seccion}
            className={`px-3 py-1 rounded ${
              seccionActual === seccion 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            {seccion.replace('_', ' ')}
          </span>
        ))}
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-bold text-xl mb-4">
          {pregunta.pregunta}
        </h3>
        
        <div className="space-y-3">
          {pregunta.opciones.map((opcion, i) => (
            <button
              key={i}
              onClick={() => handleRespuesta(i)}
              className="w-full text-left p-3 rounded border hover:bg-blue-100 transition-colors duration-200"
              disabled={mostrarFeedback}
            >
              {opcion}
            </button>
          ))}
        </div>
        
        {mostrarFeedback && (
          <div className={`mt-4 p-4 rounded ${
            respuestaCorrecta ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <p className="font-bold">
              {respuestaCorrecta ? '¡Correcto!' : 'Incorrecto'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
