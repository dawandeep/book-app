describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('Should check for wrong Password credentials', () => {
    cy.get("#email").type("gulaganjipavan25@gmail.com");
    cy.get("#password").type("1234");
    cy.get("#btnLogin").click();
    cy.wait(1000);
    cy.get("#error").should("have.text", "Incorrect email or password");
    
  });
})

// describe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/login');
//   });
//   it('Should check for correct credentials', () => {
//     cy.get("#email").type("gulaganjipavan25@gmail.com");
//     cy.get("#password").type("12345678");
//     cy.get("#btnLogin").click();
//     cy.wait(1000);
    
    
//   });
// })

describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });
  it('Should check for  wrong Register credentials', () => {
    cy.get("#firstname").type("Pavan");
    cy.get("#lastname").type("Gulaganji");
    cy.get("#email").type("gulaganjipavan25@gmail.com");
    cy.get("#password").type("12345678");
    cy.get("#confirmpassword").type("12345678");
    cy.get("#city").type("Vijayapura");
    cy.get("#mob").type("7348877736");
    const p = 'Profile.jpeg'
    cy.get("#image").attachFile(p)
    cy.get("#btnSignup").click();
    cy.wait(1000);
    cy.get("#rsg").should("have.text","User with specified email already exists");
    
  });
})

// describe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/register');
//   });
//   it('Should check for  correct Register credentials', () => {
//     cy.get("#firstname").type("Pavan");
//     cy.get("#lastname").type("Gulaganji");
//     cy.get("#email").type("dawandeep@gmail.com");
//     cy.get("#password").type("12345678");
//     cy.get("#confirmpassword").type("12345678");
//     cy.get("#city").type("Vijayapura");
//     cy.get("#mob").type("7348877736");
//     cy.get("#image").type("https://media-exp1.licdn.com/dms/image/C4E03AQG7jGnVU2DmdQ/profile-displayphoto-shrink_100_100/0/1642763269903?e=1665619200&v=beta&t=jKCpOXgeZEl5MchOY7hSbUlgcM8EKJZPog5JvScpsVE");
//     cy.get("#btnSignup").click();
//     cy.wait(1000);
//     cy.get("#regsrrr").should("have.text","User registered successfully and Please verify your mail id");
    
//   });
// })

describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/forgot-password');
  });
  it('Should check for Forgot password credentials', () => {
   
    cy.get("#email").type("gulaganjipavan25@gmail.com");
    cy.get("#btnfgpd").click();
    cy.wait(1000);
    cy.get("#fg").should("have.text","Please check your mail and reset your password");
    
  });
})

describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/forgot-password');
  });
  it('Should check for  wrong email Forgot password credentials', () => {
   
    cy.get("#email").type("dawandeep@gmail.com");
    cy.get("#btnfgpd").click();
    cy.wait(1000);
    cy.get("#fgr").should("have.text","This email does not exists");
    
  });
})

describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Should check for Login link credentials', () => {
    cy.get("#log").click({force: true});
    cy.get("#email").type("gulaganjipavan25@gmail.com");
    cy.get("#password").type("1234");
    cy.get("#btnLogin").click();
    cy.wait(1000);
    cy.get("#error").should("have.text", "Incorrect email or password");

  });
})
describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Should check for Login and logout credentials', () => {
    cy.get("#log").click({force: true});
    cy.get("#email").type("gulaganjipavan25@gmail.com");
    cy.get("#password").type("12345678");
    cy.get("#btnLogin").click();
    cy.wait(1000);
    cy.get("#btnlggt").click({force:true});
    cy.wait(1000);
});
})
describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Should check for BOOK APP text credentials', () => {
    cy.get("#bapp").should("have.text","BOOK APP");
    
  });
})

// describe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000');
//   });
//   it('Should check for login link credentials', () => {
//     cy.contains('login').click()
//     cy.location('pathname').should('eq', '/login')
   
    
//   });
// })

// eedescribe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000');
//   });
//   it('Should check for Register link credentials', () => {
//     cy.get("#re").click({force: true});
//     cy.get("#firstname").type("Pavan");
//     cy.get("#lastname").type("Gulaganji");
//     cy.get("#email").type("gulaganjipavan25@gmail.com");
//     cy.get("#password").type("12345678");
//     cy.get("#confirmpassword").type("12345678");
//     cy.get("#city").type("Vijayapura");
//     cy.get("#mob").type("7348877736");
//     cy.get("#image").type("https://media-exp1.licdn.com/dms/image/C4E03AQG7jGnVU2DmdQ/profile-displayphoto-shrink_100_100/0/1642763269903?e=1665619200&v=beta&t=jKCpOXgeZEl5MchOY7hSbUlgcM8EKJZPog5JvScpsVE");
//     cy.get("#btnSignup").click();
//     cy.wait(1000);
//     cy.get("#rsg").should("have.text","User with specified email already exists");
    
//   });
// })

// eedescribe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/favorite');
//   });
//   it('Should check for Favorite Books text credentials', () => {
//     cy.get("#fav").should("have.text","Favorite Books");
    
//   });
// })

// describe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/explore/love');
//   });
//   it('Should check for Explore More credentials', () => {
    
//     cy.get("exp").should("have.text","Explore Books Love");


    
    
//   });
// })

// eedescribe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000');
//   });
//   it('Should check for login and logout link credentials', () => {
//       cy.get("#log").click({force: true});
//       cy.get("#email").type("gulaganjipavan25@gmail.com");
//       cy.get("#password").type("12345678");
//       cy.get("#btnLogin").click();
//       cy.wait(1000);
      
//       cy.get("#lgt").click({force: true});
//       cy.get("#lggt").click({force: true});
    
//   });
// })

describe('BOOK APP E2E Test Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Should check for Profile ', () => {
      cy.get("#log").click({force: true});
      cy.get("#email").type("gulaganjipavan25@gmail.com");
      cy.get("#password").type("12345678");
      cy.get("#btnLogin").click();
      cy.wait(1000);
      
      cy.get("#itt").click({force: true});
      cy.get("#ght").click({force: true});
    
  });
})

// describe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000');
//   });
//   it('Should check for logout and login link credentials', () => {
//       cy.get("#log").click({force: true});
//       cy.get("#email").type("gulaganjipavan25@gmail.com");
//       cy.get("#password").type("12345678");
//       cy.get("#btnLogin").click();
//       cy.wait(1000);
      
//       cy.get("#kll").click({force: true});
//       cy.get("#hju").click({force: true});
    
//   });
// })

// describe('BOOK APP E2E Test Cases', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000');
//   });
//   it('Should check for logout and login link credentials', () => {
//       cy.get("#log").click({force: true});
//       cy.get("#email").type("gulaganjipavan25@gmail.com");
//       cy.get("#password").type("12345678");
//       cy.get("#btnLogin").click();
//       cy.wait(1000);
      
//       cy.get("#kll").click({force: true});
//       cy.get("#hju").click({force: true});
    
//   });
// })






  
  
