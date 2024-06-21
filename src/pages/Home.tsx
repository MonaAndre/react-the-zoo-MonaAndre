import "../styling/Home.css"
export const Home = () => {

  return <>
    <div className="home-page">

      <h1>Välkommen till djurparken!</h1>

      <section className="home-content">
        <p>Utforska våra djur i den roliga zoo app. Upptäck fascinerande djur, lär dig intressanta fakta och ta hand om de genom att mata djur!</p>
        <div className="fun-facts">
          <h2>Visste du att?</h2>
          <ul>
            <li>Elefanter är de enda djuren som inte kan hoppa!</li>
            <li>En grupp flamingos kallas för en "flamboyance".</li>
            <li>Bläckfiskar har tre hjärtan och blått blod.</li>
            <li>Fjärilar smakar med sina fötter.</li>
          </ul>
        </div>
      </section>
    </div>
  </>
}

