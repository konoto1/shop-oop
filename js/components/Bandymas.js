export class Bandymas {
    constructor() {
        this.render();
    }

    header() {
        const HTML = `
            <header class="container">
                <div class="row">
                    
                        <img src="#" alt="Logo" class="col-lg-3">
                        <nav class="col-lg-9">
                            <a href="./" class="row">HOME</a>  
                            <a href="./services">ABOUT</a>
                            <a href="./team">SERVICES</a>
                            <a href="./contact-us">PORTFOLIO</a>
                            <a href="./contact-us">PRICING</a>
                            <a href="./contact-us">BLOG</a>
                            <a href="./contact-us">PAGES</a>
                            <a href="./contact-us">CONTACT</a>
                        </nav>
                    
                </div>
            </header>`;
        return HTML;
    }

    main() {
        const HTML = `
            <main class="container">
                <section class="row">
                    <div class="col-lg-5 m-lg-1">
                    THIS IS ME PHILIP GILBERT
                    You will begin to realise why this exercise is called the Dickens Pattern with reference to the ghost showing Scrooge some different futures.
                    </div>
                    <img class="col-lg-5 m-lg-1" src="#" alt="Photo" />
                </section>
                <section class="row">
                    <img class="col-lg-5 m-lg-1" src="#" alt="Photo" />
                    <div class="col-lg-5 m-lg-1">
                    PERSONAL DETAILS
                    Here, I focus on a range of items and features that we use in life without giving them a second thought. such as Coca Cola. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </div>
                </section>
                <section class="row">
                    <h1 class="col-lg-6 m-lg-6">My Offered Services</h1>
                    <div class="col-lg-12">
                    At about this time of year, some months after New Year’s resolutions have been made and kept, or made and neglected.
                    </div>
                </section>
                <section class="row">
                    <h2 class="col-lg-4">Web Design</h1>
                    <div class="col-lg-4">
                    “It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.”
                    </div>
                </div>
                <div>
                    <h2 class="col-lg-4">Web Design</h1>
                    <div class="col-lg-4">
                    “It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.”
                    </div>
                </div>
                <div>
                    <h2 class="col-lg-4">Web Design</h1>
                    <div class="col-lg-4">
                    “It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.”
                    </div>
                </div>
                   
                </section>
            </main>`;
        return HTML;
    }

    footer() {
        const HTML = '<footer class="container">&copy; Copyright 2024</footer>';
        return HTML;
    }

    render() {
        const DOM = document.getElementById('app');
        const HTML = this.header() + this.main() + this.footer();

        DOM.insertAdjacentHTML('beforeend', HTML);
    }
}