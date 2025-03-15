// pages/api/dream.js
import OpenAI from 'openai';

// Configurazione di OpenAI con la API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Controlla che il metodo sia POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Metodo non permesso' });
  }

  console.log('Elaborazione della richiesta di interpretazione del sogno');
  
  try {
    // Estrazione del testo del sogno dal corpo della richiesta
    const { dreamText } = req.body;
    
    // Validazione dei dati della richiesta
    if (!dreamText || typeof dreamText !== 'string' || dreamText.trim() === '') {
      console.log('Validazione della richiesta fallita: Testo del sogno mancante o non valido');
      return res.status(400).json({ 
        success: false,
        error: 'Testo del sogno mancante o non valido'
      });
    }
    
    // Log del testo del sogno (troncato per privacy/brevità se lungo)
    const truncatedText = dreamText.length > 50 
      ? `${dreamText.substring(0, 50)}...` 
      : dreamText;
    console.log(`Elaborazione del testo del sogno: "${truncatedText}"`);
    
    // Generazione dell'interpretazione del sogno usando l'API di completamento chat di OpenAI
    console.log('Richiesta di analisi del sogno a OpenAI');
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modello più ampiamente disponibile
      messages: [
        {
          "role": "system", 
          "content": "Sei un assistente specializzato nell'interpretazione dei sogni. Aiuta l'utente ad analizzare il suo sogno in modo approfondito e psicologico. Rispondi in formato paragrafo, evitando simboli markdown."
        },
        {
          "role": "user", 
          "content": `Scrivi un'analisi basata sulla descrizione del mio sogno: "${dreamText}"`
        }
      ],
      max_tokens: 500,
      temperature: 0.7 // Creatività nelle interpretazioni
    });

    // Estrazione del testo dell'analisi dalla risposta
    const dreamAnalysis = completion.choices[0].message.content;
    console.log('Analisi del sogno ricevuta con successo da OpenAI');
    
    // Generazione della versione audio dell'interpretazione usando Text-to-Speech
    console.log('Richiesta di generazione audio a OpenAI TTS');
    let audioBase64 = null;
    try {
      const audioResponse = await openai.audio.speech.create({
        model: "tts-1",  // Modello TTS di OpenAI
        voice: "alloy",  // Opzioni: "alloy", "echo", "fable", "onyx", "nova", "shimmer"
        input: dreamAnalysis.substring(0, 4000)  // Limitato a 4000 caratteri per sicurezza
      });
      
      // Conversione del buffer in base64 per l'invio al client
      const audioBuffer = await audioResponse.arrayBuffer();
      audioBase64 = Buffer.from(audioBuffer).toString('base64');
      console.log('Audio ricevuto con successo da OpenAI TTS');
    } catch (ttsError) {
      console.error('Errore nella generazione audio (continuando senza audio):', ttsError);
      // Non fallire l'intera richiesta se la generazione audio fallisce
    }
    
    // Generazione di un'immagine di visualizzazione del sogno usando DALL-E
    console.log('Richiesta di visualizzazione del sogno a OpenAI');
    const imageResponse = await openai.images.generate({
      prompt: `Genera un'immagine onirica e surreale che visualizzi il seguente sogno: "${dreamText}". L'immagine deve essere evocativa, con colori e forme che richiamano l'atmosfera onirica.`,
      n: 1, // Generazione di una sola immagine
      size: "1024x1024" // Immagine quadrata, ottima per la visualizzazione
    });
    
    // Estrazione dell'URL dell'immagine dalla risposta
    const imageUrl = imageResponse.data[0].url;
    console.log('Visualizzazione del sogno ricevuta con successo da OpenAI');
    
    // Invio della risposta con interpretazione testuale, audio e URL dell'immagine
    console.log('Invio della risposta completa al client');
    res.status(200).json({
      success: true,
      analysis: dreamAnalysis,
      audioData: audioBase64 ? `data:audio/mp3;base64,${audioBase64}` : null,
      imageUrl: imageUrl
    });
    
  } catch (error) {
    // Gestione completa degli errori
    console.error('Errore nell\'elaborazione dell\'interpretazione del sogno:', error);
    
    // Gestione degli errori specifici dell'API OpenAI
    if (error.response) {
      console.error('Errore API OpenAI:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
      
      // Gestione del rate limiting
      if (error.response.status === 429) {
        return res.status(429).json({
          success: false,
          error: 'Troppe richieste. Riprova tra qualche minuto.',
          details: 'Rate limit exceeded on OpenAI API'
        });
      }
      
      // Gestione degli errori di autenticazione
      if (error.response.status === 401) {
        return res.status(500).json({
          success: false,
          error: 'Errore di configurazione del server. Contattare l\'amministratore.',
          details: 'Authentication error with OpenAI API'
        });
      }
    }
    
    // Risposta generica in caso di errore
    res.status(500).json({
      success: false,
      error: 'Si è verificato un errore durante l\'elaborazione della richiesta',
      details: error.message || 'Errore sconosciuto'
    });
  }
}
