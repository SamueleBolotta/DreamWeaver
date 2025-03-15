import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [dreamDescription, setDreamDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dreamAnalysis, setDreamAnalysis] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioData, setAudioData] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dreamDescription.trim()) {
      setError('Per favore, inserisci la descrizione del tuo sogno.');
      return;
    }

    setIsLoading(true);
    setError('');
    setDreamAnalysis('');
    setImageUrl('');
    setAudioData('');
    
    try {
      const response = await fetch('/api/dream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dreamText: dreamDescription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Errore: ${response.status}`);
      }

      const data = await response.json();
      setDreamAnalysis(data.analysis);
      setImageUrl(data.imageUrl);
      setAudioData(data.audioData); // Salva i dati audio dalla risposta
    } catch (err) {
      console.error('Si è verificato un errore:', err);
      setError('Si è verificato un errore durante l\'elaborazione della richiesta: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>DreamWeaver - Interpreta i tuoi sogni con l'AI</title>
        <meta name="description" content="Un'applicazione per interpretare i sogni utilizzando l'intelligenza artificiale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          DreamWeaver
        </h1>
        
        <p className={styles.description}>
          Racconta il tuo sogno e lascia che l'AI lo interpreti, lo visualizzi e lo racconti
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            value={dreamDescription}
            onChange={(e) => setDreamDescription(e.target.value)}
            placeholder="Descrivi il tuo sogno..."
            rows={6}
            required
          />
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Elaborazione in corso...' : 'Interpreta il sogno'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Sto interpretando il tuo sogno...</p>
          </div>
        )}

        {dreamAnalysis && (
          <div className={styles.resultContainer}>
            <h2 className={styles.resultTitle}>Interpretazione del sogno</h2>
            <div className={styles.analysisText}>{dreamAnalysis}</div>
            
            {/* Sezione per l'audio */}
            {audioData && (
              <div className={styles.audioSection}>
                <h3 className={styles.audioTitle}>Ascolta l'interpretazione</h3>
                <audio 
                  controls
                  src={audioData}
                  className={styles.dreamAudio}
                >
                  Il tuo browser non supporta l'elemento audio.
                </audio>
              </div>
            )}
          </div>
        )}

        {imageUrl && (
          <div className={styles.imageContainer}>
            <h2 className={styles.resultTitle}>Visualizzazione del sogno</h2>
            <img 
              src={imageUrl} 
              alt="Visualizzazione del sogno" 
              className={styles.dreamImage} 
            />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Creato con Next.js e OpenAI</p>
      </footer>
    </div>
  );
}
