// Funktion zum Abrufen von JSON-Daten vom Server

export const ObjectAntwort = async (req, res, fehler) => {
  // HTTP-Anfrage an den Server senden
  const antwort = await fetch(`http://localhost:1001${req}`);
  try {
    // Überprüfen, ob die Antwort vom Server OK ist
    if (!antwort.ok) {
      fehler(antwort.statusText); // Falls nicht OK, Fehlerstatus in der Konsole ausgeben und eine Ausnahme werfen
      throw new Error(`Der Server meldet Fehler: ${antwort.statusText}`);
    } else {
      // JSON-Daten aus der Antwort extrahieren und an den Callback weitergeben
      const objekt = await antwort.json();
      res(objekt);
    }
  } catch (wert) {
    fehler(wert); // Fehlerbehandlung: Fehler an den Callback weitergeben
  }
};

// Funktion zum Abrufen von Textdaten vom Server
export const TextAntwort = async (req, res, fehler) => {
  // HTTP-Anfrage an den Server senden
  const antwort = await fetch(`http://localhost:1001${req}`);
  try {
    // Überprüfen, ob die Antwort vom Server OK ist
    if (!antwort.ok) {
      // Falls nicht OK, Fehlerstatus in der Konsole ausgeben und eine Ausnahme werfen
      fehler(antwort.statusText);
      throw new Error(`Der Server meldet Fehler: ${antwort.statusText}`);
    } else {
      // Textdaten aus der Antwort extrahieren und an den Callback weitergeben
      const text = await antwort.text();
      res(text);
    }
  } catch (wert) {
    fehler(wert);
  }
};
