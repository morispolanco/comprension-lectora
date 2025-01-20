import useStore from '../store';

export default function Progreso() {
  const progreso = useStore((state) => state.progreso);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Tu Progreso</h2>
      <div className="space-y-4">
        {Object.entries(progreso).map(([tipo, valor]) => (
          <div key={tipo}>
            <div className="flex justify-between mb-1">
              <span className="capitalize">{tipo.replace('_', ' ')}</span>
              <span>{valor}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${valor}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
