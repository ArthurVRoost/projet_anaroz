import { useForm, router } from '@inertiajs/react';

export default function Mailbox({ messages }) {
  const { data, setData, post, reset } = useForm({ reply: '' });

  const handleReply = (id) => {
    post(route('admin.mailbox.reply', id), {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Boîte de réception</h1>
      {messages.map((msg) => (
        <div key={msg.id} className="border rounded-lg p-4 mb-4">
          <p><strong>De :</strong> {msg.name} ({msg.email})</p>
          <p><strong>Sujet :</strong> {msg.subject}</p>
          <p className="mt-2">{msg.message}</p>

          {!msg.replied && (
            <form onSubmit={(e) => { e.preventDefault(); handleReply(msg.id); }} className="mt-4">
              <textarea
                className="border p-2 w-full"
                placeholder="Votre réponse"
                value={data.reply}
                onChange={(e) => setData('reply', e.target.value)}
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
                Envoyer la réponse
              </button>
            </form>
          )}
          {msg.replied && <p className="text-green-500 mt-2">Répondu ✅</p>}
        </div>
      ))}
    </div>
  );
}