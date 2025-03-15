# DreamWeaver - Interpretatore di sogni

DreamWeaver è un'applicazione web basata su Next.js che utilizza modelli avanzati di AI per offrire interpretazioni di sogni personalizzate. Questo servizio permette agli utenti di inserire descrizioni dettagliate dei loro sogni e ricevere analisi approfondite sul possibile significato e sui simbolismi presenti.

## 🌟 Caratteristiche

- **Interfaccia intuitiva**: Facile da usare per descrivere i tuoi sogni in dettaglio
- **Interpretazione avanzata**: Utilizza modelli di linguaggio avanzati per analizzare e interpretare i sogni
- **Analisi simbolica**: Identifica simboli comuni e il loro significato contestuale
- **Responsive design**: Funziona perfettamente su desktop, tablet e dispositivi mobili

## 🚀 Come iniziare

### Prerequisiti

Prima di iniziare, assicurati di avere installato:

- [Node.js](https://nodejs.org/) (versione 14.x o superiore)
- [npm](https://www.npmjs.com/) (normalmente incluso con Node.js)
- [Git](https://git-scm.com/) per clonare il repository

### Installazione e setup

1. **Clona il repository**

   ```bash
   git clone git@github.com:SamueleBolotta/DreamWeaver.git
   cd DreamWeaver
   ```

2. **Installa le dipendenze**

   ```bash
   npm install
   ```

   > **Nota Importante:** La directory `node_modules` non è inclusa nel repository e verrà creata automaticamente quando esegui `npm install`.
   
3. **Configura le variabili d'ambiente**

   Crea un file `.env.local` nella directory principale del progetto con il seguente contenuto:

   ```plaintext
   # Chiave API per OpenAI o altra API di AI che stai utilizzando
   API_KEY=your_api_key_here
   ```

   Sostituisci `your_api_key_here` con la tua chiave API effettiva.

4. **Avvia l'ambiente di sviluppo**

   ```bash
   npm run dev
   ```

   L'applicazione sarà disponibile all'indirizzo [http://localhost:3000](http://localhost:3000).

## 🛠️ Struttura del progetto

```
DreamWeaver/
│
├── node_modules/       # Dipendenze del progetto (generate da npm install)
├── pages/              # Pagine dell'applicazione
│   ├── api/            # Endpoint API
│   └── index.js        # Pagina principale
│
├── public/             # File statici accessibili pubblicamente
├── styles/             # File CSS e stili
│
├── .gitignore          # File e cartelle ignorate da Git
├── package.json        # Dipendenze e script
├── next.config.js      # Configurazione di Next.js
└── README.md           # Questo file
```

## 📝 Come Usare l'applicazione

1. Apri l'applicazione nel browser all'indirizzo [http://localhost:3000](http://localhost:3000)
2. Inserisci la descrizione del tuo sogno nell'area di testo
3. Clicca sul pulsante "Interpreta Sogno"
4. Attendi che l'AI analizzi il tuo sogno
5. Visualizza l'interpretazione dettagliata fornita dall'applicazione

## 🧠 Come funziona

DreamWeaver utilizza un approccio basato su:

1. **Analisi del testo**: Il sistema analizza la descrizione del sogno per identificare elementi chiave, emozioni e contesto
2. **Identificazione dei simboli**: L'AI identifica simboli comuni e il loro possibile significato nel contesto del sogno
3. **Interpretazione contestuale**: Fornisce un'interpretazione che considera il contesto personale e culturale, quando disponibile
4. **Generazione di risposta**: Crea una risposta comprensibile e dettagliata che offre spunti di riflessione all'utente

## 🤝 Contribuire al progetto

Siamo felici di ricevere contributi! Ecco come puoi aiutare:

1. Fai un fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. Committa le tue modifiche (`git commit -m 'Aggiunta di una funzionalità'`)
4. Pusha al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## 📚 Risorse utili

- [Documentazione di Next.js](https://nextjs.org/docs)
- [Documentazione di React](https://reactjs.org/docs/getting-started.html)
- [Guida all'API di OpenAI](https://platform.openai.com/docs/api-reference) (se utilizzata)

## 📄 Licenza

Questo progetto è distribuito con licenza MIT. Consulta il file `LICENSE` per maggiori informazioni.

## 📞 Contatti

Samuele Bolotta - [bolottasamuele@gmail.com](mailto:bolottasamuele@gmail.com)

Link al Progetto: [https://github.com/SamueleBolotta/DreamWeaver](https://github.com/SamueleBolotta/DreamWeaver)

