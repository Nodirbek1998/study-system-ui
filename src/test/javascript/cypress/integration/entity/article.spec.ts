import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Article e2e test', () => {
  const articlePageUrl = '/article';
  const articlePageUrlPattern = new RegExp('/article(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const articleSample = {};

  let article: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/articles+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/articles').as('postEntityRequest');
    cy.intercept('DELETE', '/api/articles/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (article) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/articles/${article.id}`,
      }).then(() => {
        article = undefined;
      });
    }
  });

  it('Articles menu should load Articles page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('article');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Article').should('exist');
    cy.url().should('match', articlePageUrlPattern);
  });

  describe('Article page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(articlePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Article page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/article/new$'));
        cy.getEntityCreateUpdateHeading('Article');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', articlePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/articles',
          body: articleSample,
        }).then(({ body }) => {
          article = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/articles+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/articles?page=0&size=20>; rel="last",<http://localhost/api/articles?page=0&size=20>; rel="first"',
              },
              body: [article],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(articlePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Article page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('article');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', articlePageUrlPattern);
      });

      it('edit button click should load edit Article page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Article');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', articlePageUrlPattern);
      });

      it('last delete button click should delete instance of Article', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('article').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', articlePageUrlPattern);

        article = undefined;
      });
    });
  });

  describe('new Article page', () => {
    beforeEach(() => {
      cy.visit(`${articlePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Article');
    });

    it('should create an instance of Article', () => {
      cy.get(`[data-cy="name"]`).type('Awesome Industrial').should('have.value', 'Awesome Industrial');

      cy.get(`[data-cy="text"]`).type('Right-sized').should('have.value', 'Right-sized');

      cy.get(`[data-cy="createdAt"]`).type('2022-03-11').should('have.value', '2022-03-11');

      cy.get(`[data-cy="updatedAt"]`).type('2022-03-11').should('have.value', '2022-03-11');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        article = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', articlePageUrlPattern);
    });
  });
});
