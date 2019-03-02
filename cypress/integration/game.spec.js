describe('Game tests', () => {
    it('Healtcheck', () => {
        cy.visit('');
        cy.contains('Lets play red and cyan!')
    });

    it('Clicking on the first cell should change the colour to red', () => {
        cy.visit('');
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=topLeft]')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(255, 0, 0)');
    });

    it('Clicking on the second cell should change the colour to cyan', () => {
        cy.visit('');
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=topMiddle]').click();
        cy.get('[data-cy=topMiddle]')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(0, 255, 255)');
    });

    it('Clicking on new game midway through game resets the board', () => {
        cy.visit('');
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=topMiddle]').click();
        cy.get('[data-cy=newGame]').click();
        cy.get('[data-cy=topMiddle]')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(255, 255, 255)');
            cy.get('[data-cy=topLeft]')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(255, 255, 255)');
    });

    it('Play a game without either user winning', () => {
        cy.visit('');
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=topMiddle]').click();

        cy.get('[data-cy=topRight]').click();
        cy.get('[data-cy=bottomRight]').click();

        cy.get('[data-cy=middleMiddle]').click();
        cy.get('[data-cy=middleRight]').click();

        cy.get('[data-cy=bottomMiddle]').click();
        cy.get('[data-cy=bottomLeft]').click();
        
        cy.get('[data-cy=middleLeft]').click();

        cy.get('[data-cy=winner]').contains('BOOO! No winner today!');
    });

    it('Test winning scenario 1: match top 3 cells', () => {
        cy.visit('');
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=bottomRight]').click();

        cy.get('[data-cy=topMiddle]').click();
        cy.get('[data-cy=middleMiddle]').click();

        cy.get('[data-cy=topRight]').click();

        cy.get('[data-cy=winner]').contains('RED WON!');        
    });

    it('Test winning scenario 2: match middle 3 cells', () => {
        cy.visit('');
        
        cy.get('[data-cy=bottomRight]').click();
        cy.get('[data-cy=middleLeft]').click();
        
        cy.get('[data-cy=topRight]').click();
        cy.get('[data-cy=middleRight]').click();
        
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=middleMiddle]').click();

        cy.get('[data-cy=winner]').contains('CYAN WON!');        
    });

    it('Test winning scenario 3: match bottom 3 cells', () => {
        cy.visit('');
        
        cy.get('[data-cy=bottomRight]').click();
        cy.get('[data-cy=middleLeft]').click();
        
        cy.get('[data-cy=bottomLeft]').click();
        cy.get('[data-cy=middleRight]').click();
        
        cy.get('[data-cy=bottomMiddle]').click();

        cy.get('[data-cy=winner]').contains('RED WON!');        
    });

    it('Test winning scenario 4: match diagonally from top left', () => {
        cy.visit('');
        
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=middleLeft]').click();

        cy.get('[data-cy=bottomRight]').click();
        cy.get('[data-cy=middleRight]').click();
        
        cy.get('[data-cy=middleMiddle]').click();

        cy.get('[data-cy=winner]').contains('RED WON!');        
    });

    it('Test winning scenario 5: match top left vertically', () => {
        cy.visit('');
        
        cy.get('[data-cy=topLeft]').click();
        cy.get('[data-cy=middleMiddle]').click();

        cy.get('[data-cy=bottomLeft]').click();
        cy.get('[data-cy=middleRight]').click();
        
        cy.get('[data-cy=middleLeft]').click();

        cy.get('[data-cy=winner]').contains('RED WON!');        
    });

    it('Test winning scenario 6: match top right vertically', () => {
        cy.visit('');
        
        cy.get('[data-cy=topRight]').click();
        cy.get('[data-cy=middleMiddle]').click();

        cy.get('[data-cy=bottomRight]').click();
        cy.get('[data-cy=bottomLeft]').click();
        
        cy.get('[data-cy=middleRight]').click();

        cy.get('[data-cy=winner]').contains('RED WON!');        
    });

    it('Test winning scenario 7: match top right diagonally', () => {
        cy.visit('');
        
        cy.get('[data-cy=bottomRight]').click();
        cy.get('[data-cy=topRight]').click();
    
        cy.get('[data-cy=middleRight]').click();
        cy.get('[data-cy=middleMiddle]').click();    
        
        cy.get('[data-cy=middleLeft]').click();
        cy.get('[data-cy=bottomLeft]').click();        
    
        cy.get('[data-cy=winner]').contains('CYAN WON!');        
    });

    it('Test winning scenario 8: match middle vertically', () => {
        cy.visit('');
        
        cy.get('[data-cy=topRight]').click();
        cy.get('[data-cy=middleMiddle]').click();

        cy.get('[data-cy=bottomRight]').click();
        cy.get('[data-cy=topMiddle]').click();
        
        cy.get('[data-cy=bottomLeft]').click();
        cy.get('[data-cy=bottomMiddle]').click();
        
        cy.get('[data-cy=winner]').contains('CYAN WON!');        
    });

});