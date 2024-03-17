window.addEventListener("load", async () => {
  let puppets = localStorage.getItem("puppets");
  if (puppets) {
    if (document.querySelector("#puppets")) {
      document.querySelector("#puppets").value = JSON.parse(puppets);
    }
  }
  if (document.querySelector("#puppetsform")) {
    document.getElementById("puppetsearch").focus();
    document
      .querySelector("#puppetsform")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        localStorage.setItem(
          "puppets",
          JSON.stringify(document.querySelector("#puppets").value)
        );
      });

    let filterable = [];
    const populateDatalist = () => {
      const datalist = document.getElementById("puppetlist");
      datalist.innerHTML = "";
      filterable.forEach((puppet) => {
        const option = document.createElement("option");
        option.value = puppet;
        datalist.appendChild(option);
      });
    };

    document
      .getElementById("puppetsearch")
      .addEventListener("input", async (e) => {
        const inputValue = e.target.value.toLowerCase().replaceAll(" ", "_");
        e.target.value = inputValue;
        filterable = puppets
          ? JSON.parse(puppets)
              .split("\n")
              .map((puppet) => puppet.toLowerCase().replaceAll(" ", "_"))
          : [];
        populateDatalist();
      });

    document
      .getElementById("puppetsearch")
      .addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          const inputValue = this.value.toLowerCase().replaceAll(" ", "_");
          const nearest = filterable.filter((puppet) =>
            puppet.includes(inputValue)
          )[0];
          if (nearest) {
            const url = `https://nationstates.net/container=${nearest}/nation=${nearest}`;
            console.log(url);
            window.open(url, "_blank");
          }
        }
      });

    // document
    //   .getElementById("puppetsearch")
    //   .addEventListener("input", function (e) {
    //     const inputValue = e.target.value.toLowerCase().replaceAll(" ", "_");
    //     const options = document.querySelectorAll("#puppetlist option");
    //     options.forEach((option) => {
    //       if (option.value.toLowerCase().replaceAll(" ", "_") === inputValue) {
    //         const url = `https://nationstates.net/container=${inputValue}/nation=${inputValue}`;
    //         window.open(url, "_blank");
    //       }
    //     });
    //   });

    document.addEventListener("keypress", async (event) => {
      if (
        event.key === "Enter" &&
        document.getElementById("puppetsearch").value.trim() !== ""
      ) {
        const inputValue = document
          .getElementById("puppetsearch")
          .value.toLowerCase()
          .replace(" ", "_");
        const nearest = filterable.filter((puppet) =>
          puppet.includes(inputValue)
        )[0];
        if (nearest) {
          const url = `https://nationstates.net/container=${nearest}/nation=${nearest}`;
          console.log(url);
          window.open(url, "_blank");
        }
      }
    });
  }
});
