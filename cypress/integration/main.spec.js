describe('Component - App.js', function(){
    it('Should visit the site', ()=>{
        cy.visit('/')
    })
})
describe('Component - Header.js', () => {
    it('Should have the text "TimeLike"', () => {
        cy.get('header > section > h1').should('have.text', 'Time Like')
    })
    it('')
})