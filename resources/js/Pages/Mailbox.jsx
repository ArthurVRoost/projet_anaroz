import Footer from '@/Components/Footer';
import NavAdmin from '@/Components/NavAdmin';
import { useForm } from '@inertiajs/react';
import '../../css/mailbox.css';

export default function Mailbox({ messages, bannerImage }) {
  const { data, setData, post, reset } = useForm({ reply: '' });

  const handleReply = (id) => {
    post(route('admin.mailbox.reply', id), {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <NavAdmin />

      
      <div className="mailbox-banner">
        <div className="mailbox-banner-content">
          <h2 className="mailbox-title">Mailbox</h2>
          <p className="mailbox-subtitle">Aranoz - Shop System</p>
        </div>
      </div>

      
      <div className="mailbox-container">
        <h1 className="mailbox-heading">Boîte de réception</h1>

        {messages.map((msg) => (
          <div key={msg.id} className="mailbox-card">
            <p><strong>De :</strong> {msg.name} ({msg.email})</p>
            <p><strong>Sujet :</strong> {msg.subject}</p>
            <p className="mailbox-message">{msg.message}</p>

            {!msg.replied && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReply(msg.id);
                  return false;
                }}
                className="mailbox-form"
              >
                <textarea
                  className="mailbox-textarea"
                  placeholder="Votre réponse"
                  value={data.reply}
                  onChange={(e) => setData('reply', e.target.value)}
                />
                <button type="submit" className="mailbox-btn">
                  Envoyer la réponse
                </button>
              </form>
            )}

            {msg.replied && <p className="mailbox-replied">Répondu!</p>}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}