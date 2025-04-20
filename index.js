window.addEventListener("DOMContentLoaded", (event) => {
    //window.uri_hash = window.location.hash.replace('#', '');
    //window.uri_hash = window.location.pathname.replace('spa-test/', '');
    //window.uri_hash = window.location.pathname.split('/', 3);
    window.currentPage = window.location.pathname.split('/').pop();

    /*window.fetchPage = function(p) {
        fetch(`api.php?page=${p}`, {
            method: "GET",
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                errHandler(data.error)
            }
        })
        .then(data => {
            if(data.success === true || data.success) {
                displayPage(data.page)
            } else {
                errHandler(data.error);
            }
        })
        .catch(error => 
            console.error(error)
        );
    }*/

    window.fetchPage = function(p) {
        window.currentPage = p;
        fetch(`pages/${p}.html`, {
            method: "GET",
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                errHandler(response.error);
            }
        })
        .then(data => {
            const parser = new DOMParser();
            const page = parser.parseFromString(data, "text/html");
            console.log(page);
            history.pushState("", "", p);
            document.title = currentPage;
            displayPage(page.querySelector('.loaded-wrapper').innerHTML);
        })
        .catch(error => 
            errHandler(error)
        );
    }

    function displayPage(p) {
        document.getElementById("current-page").innerHTML = null;
        document.getElementById("page-content").innerHTML = null;
        
        if(p !== undefined || !p || p !== null) {
            document.getElementById("current-page").innerText = `Currently on page ${currentPage}`;
            document.getElementById("page-content").innerHTML = p;
        } else {
            alert('Error loading page')
        }
    }

    function navbar() {
        document.getElementById("navbar").innerHTML = `<a href="home">Home</a>&nbsp;<a href="test">Test</a>`;
    }

    function errHandler(e) {
        throw new Error(e || "An unknown error occured"),
        console.error(e),
        document.getElementById("page-content").innerText = e;
    }

    function theme() {
        let darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if(darkTheme) {
            document.body.style.backgroundColor = "#333";
            document.body.style.color = "#ddd";
        }
    }

    function ajustScreen() {
        let small = window.matchMedia("(max-width: 768px)").matches;
        if(small) {
            document.body.style.fontSize = "28px";
        }
    }

    function onLinkClick() {
        document.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                let value = link.getAttribute("href");
                fetchPage(value);
            });
        });
    }    

    fetchPage(currentPage);
    navbar();
    onLinkClick();
    ajustScreen();
    theme();
});
