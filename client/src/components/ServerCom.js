export const ObjectAntwort = async (req,res,fehler) => {
    const antwort = await fetch(`http://localhost:1001${req}`)
    try{
        if(!antwort.ok){
            fehler(antwort.statusText);
            throw new Error(`Der Server meldet Fehler: ${antwort.statusText}`)
        }
        else{
            const objekt=await antwort.json();
            res(objekt);
        }
    }
    catch(wert)
    {
        fehler(wert);
    }
    };
    
    export const TextAntwort = async (req,res,fehler)=>{
        const antwort = await fetch(`http://localhost:1001${req}`)
        try{
           if(!antwort.ok){
                fehler(antwort.statusText);
                throw new Error (`Der Server meldet Fehler: ${antwort.statusText}`)
            }
            else{
                const text=await antwort.text();
                res(text);
            }
        }
        catch(wert)
        {
            fehler(wert);
        }
    }
    