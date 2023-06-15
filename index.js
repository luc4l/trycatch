//Chiamata Js verso l'esterno ----> Funzione fetch Prendere dati dall'esterno 


const $tbody = document.querySelector("#tbody")     //$ indica che è un elemento html , querySelector selezione all'interno dell'documento html 
const state = {
    posts: [],                                      //[array vuoto] all'interno salviamo i nostri posts centraliz. 
}

const generateTableRowHTML = (post) => {                     /*questa funzione deve restituire l'HTML da renderiz in pag. , 
                                                        parametro post (avrà i 4 paramentri HTML USER ID, id , title e body etc) LOOP */

                                                        //inseriamo nel return i `` con la parte di HTML 
                                                        //viene generata questa stringa html con l'interpolazione che userem come parametro 
    return `
    <tr>                                               
        <td>${post.userId}</td>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
    </tr>
    `
}

const fetchData = async () => {                  /*Funzione asincrona da eseguire dentro il codice asincrono, 
                                                   fetchData restituisce => Promise<void> (void significa che la funzione non restituisce nulla, non ha un return)
                                                    quindi una funzione asincrona che non restituisce niente.*/

                                                 //marcare funzione asincrona mediante async

//    return 2;                                  //in questo caso <void> viene sostituito da <number>


                            //Quando lavoriamo con le funzioni asincrone dobbiamo usare all'interno sempre il blocco " try catch "

    try {                                          /*tra le graffe c'è lo scope in cui noi andremmo ad eseguire il codice, 
                                                   se si verifica un errore cath andrà ad individuarlo, 
                                                   in questo caso possiamo fare quello che vogliamo del nostro errore */


                                                   /*Fetch ha 2 parametri, input (link a cui fare la chiamata GET, il server risponde con l'array di oggetti e 
                                                                                                considerata l'assenza di html, stampa diret l'array
                                                                                                esempio di chiamata Get:  (link di un sito)) e un oggetto. */

        const response = await fetch("https://jsonplaceholder.typicode.com/posts")     //Fetch con 1 solo parametro (INPUT) , chiamata asincrona di cui non abbiamo idea di quando terminerà la sua esecuzione               
                                                                                        /*await permette di aspettare la funzione di fetch, in questo caso diciamo a Js 
                                                                                        di aspettare che finisca la funzione asincrona fetch poichè ci serve il contenuto della funzione fetch.
                                                                                        in Console andrà in stampa l'istanza della classe response ovvero la risposta di fetch con 
                                                                                        tutte le informazioni  */

        const result = await response.json()                                                  /*come si ottengono i dati ? con fetch grazie al metodo 
                                                                                        dentro response che si chiama Json(funzione)
                                                                                        da Promise <any>, any indica che è possibile ottenere qualsiasi tipo di dato
                                                                                        tieni in considerazione che bisogna attendere i dati, quindi usa AWAIT come nel caso di fetch */
        
        //console.log(response);                                                   in questo modo il console.log risulta accessibile
        //console.log(result);                                                        //stampa in console grazie ad await response.json() l'array di oggetti pronti per essere sistemati in pag. rendendoli accessibili. 
        state.posts= result;                                                          //ci permette di salvare i nostri dati nella nostra area centralizzata 
    } catch (error) {
        console.error(error);                       /*l'errore si deve generare dentro lo scope di try, 
                                                    ciò permette di mascherare e gestire al meglio l'errore nei confronti
                                                    dell'utente creando ad esempio un alert */ 


                                                    /*Lato server: ogni volta che si genera un'errore si va incontro al down del server, 
                                                    inviando se in produzione l'errore in output server, MAI in console.log (non servirebbe tranne in fase di sviluppo)
                                                    con try catch il server non va in down, le restanti funzioni continuano a funzionare*/


    }                                           


}

//fetchData()                                           //Per eseguire la costante fetchData aggiungiamo le ()
                                                      /* In console.log sarà presente > Promise {<pending>}, 
                                                        quindi Fetch è asincrona (trasmissione dati che non dipende dal compiersi di 
                                                        altri processi ).
                                                        Quindi verrà salvata dentro promise in stato pending (attesa di risposta del server) */


const renderData = () => {                              //trasformare i nostri dati in una riga di HTML, costruiamo una funzione che trasforma i dati in HTML
    const HTML = state.posts.map((posts) => {           //andiamo ad eseguire map() call back di map, il primo parametro si chiamerà posts, map crea una nuovo Array
        return generateTableRowHTML(post)              /*manipolare i dati creando map con un nuovo Array map ossia, avrò una stringa HTML TableRow 
                                                        già pronta per ogni posts che passo, tutti gli oggetti contenuti saranno trasformati in HTML*/ 
    }).join("");                                        //separatore o stringa vuota ?   nel caso volessimo separare con qualche simbolo, renderData indica anche si deve renderiz in pag.      

    $tbody.innerHTML = HTML ;                                        //inserire un HTML dentro un elemento HTML 
}

                                                            /*In questo momento siamo davanti ad un Array di stringhe, vogliamo una stringa unica, 
                                                            usiamo JOIN per concatenare */

const init = async () => {
                                                          //creiamo una funzione wrappa tutto in asincrono 
    await fetchData();
    renderData();                                                 
}

init();
                                                            