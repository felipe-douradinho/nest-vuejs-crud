describe("Knight Entire Flow", () => {
  const random = Math.floor(Math.random() * 100);

  it("tests Create a new Knight", () => {
    cy.viewport(1920, 869);
    cy.visit("http://localhost:4173/knights/create");

    cy.get("#name").click();
    cy.get("#name").type("Novo Cavaleiro " + random);
    cy.get("#nickname").click();
    cy.get("#nickname").type("Apelido");
    cy.get("#keyAttribute").select("dexterity");
    cy.get("#attr_strength").click();
    cy.get("#attr_strength").type("1");
    cy.get("#attr_dexterity").click();
    cy.get("#attr_dexterity").type("2");
    cy.get("#attr_constitution").click();
    cy.get("#attr_constitution").type("3");
    cy.get("#attr_intelligence").click();
    cy.get("#attr_intelligence").type("4");
    cy.get("#attr_wisdom").click();
    cy.get("#attr_wisdom").click();
    cy.get("#attr_wisdom").click();
    cy.get("#attr_wisdom").type("5");
    cy.get("div:nth-of-type(6)").click();
    cy.get("#attr_charisma").type("6");
    cy.get("div > div > div > div > div.container button").click();
    cy.get("#accordionWeapons button").click();
    cy.get("#accordionWeapons div:nth-of-type(1) > div:nth-of-type(1) > input").click();
    cy.get("#accordionWeapons div:nth-of-type(1) > div:nth-of-type(1) > input").type("Arma 1");
    cy.get("#collapseWeapon_0").click();
    cy.get("#mod_0").click();
    cy.get("#mod_0").type("123");
    cy.get("#attr_0").select("constitution");

    cy.get("div:nth-of-type(1) > div:nth-of-type(3) input").click();
    cy.get("div.dp__month_year_row > div > button:nth-of-type(1)").click();
    cy.get("div.dp__month_year_row div:nth-of-type(4) > div:nth-of-type(2) > div").click();
    cy.get("div.dp__month_year_row > div > button:nth-of-type(2)").click();
    cy.get("div:nth-of-type(43) > div:nth-of-type(1) > div").click();
    cy.get("div.dp__calendar > div:nth-of-type(3) > div:nth-of-type(2) > div").click();
    cy.get("button.dp__action_select").click();
    cy.get("body > div > div > div > div > button").click();

    cy.visit("http://localhost:4173/knights");

    cy.get('td')
        .contains('Novo Cavaleiro ' + random)
        .should('be.visible');
  });

  it("tests Delete a Knight", () => {
    cy.viewport(1920, 869);
    cy.visit("http://localhost:4173/knights");

    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);

      cy.contains('td', 'Novo Cavaleiro ' + random)
          .parent('tr')
          .find('button.btn-danger')
          .click();

      cy.get('td:contains("Novo Cavaleiro '+random+'")')
          .should('not.exist');
    });
  });

  it("tests Check if become a Hero", () => {
    cy.visit("http://localhost:4173/heroes");

    cy.get('td')
        .contains('Novo Cavaleiro ' + random)
        .should('be.visible');
  });
});