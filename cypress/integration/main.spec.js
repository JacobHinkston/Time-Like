describe('Component - App.js', () => {
    it('.should() visit the hosted URL', () => {
        cy.visit('localhost:3000')
    })
})
describe('Component - Header.js', () => {
    it('.should() have a header', () => {
        cy.get('html').should('contain', 'header')
    })
    it('.should() have text h1 with text "Time Like"', () => {
        cy.get('header > section > h1').should('have.text', 'Time Like')
    })
    it('.should() have a gif', () => {
        cy.get('header > section > img').should('have.attr', 'src', '/static/media/likes.2b82c98e.gif')
    })
    it('.should() have a navbar', () => {
        cy.get('html').should('contain', 'nav')
    })
    it('.should() start on home page', ()=>{
        cy.get('.section-not-logged-in')
    })
    it('.should() have a "Home" link', ()=>{ 
        cy.get('.nav-button').eq(0).should('have.text', 'Home')
    })
    it('.should() have a "About" link', ()=>{
        cy.get('.nav-button').eq(1).should('have.text', 'About')
    })
    it('.should() have a "Login" link', ()=>{
        cy.get('.nav-button').eq(2).should('have.text', 'Login')
    })
})
describe('Component - Home.js', ()=>{
    it('.should() load Home on "Home" click', ()=>{
        const homeLink = cy.get('.nav-button').eq(0)
        homeLink.should('have.text', 'Home')
        homeLink.click()
        cy.get('html').should('contain', '.component-home')
    })
    it('.should() load About on "About" click', ()=>{
        const aboutLink = cy.get('.nav-button').eq(1)
        aboutLink.should('have.text', 'About')
        aboutLink.click()
        cy.get('html').should('contain', '.component-home')
    })
    // it('.should() login to instagram correctly', () => {
    //     const loginLink = cy.get('.nav-button').eq(2)
    //     loginLink.click()
    // })
    //Any tests involving being logged in will not work with cypress due to CORS, cant test logged in users without extra test cases with misc test auth tokens etc.
})