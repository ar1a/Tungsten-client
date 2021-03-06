import React from 'react';
import { Button } from 'react-md/lib/Buttons';
import { List, ListItem } from 'react-md/lib/Lists';
import { Cell, Grid } from 'react-md/lib/Grids';
import get from 'lodash/get';
import { Connect, query } from 'urql';
import { CSSTransitionGroup } from 'react-transition-group';

const RECIPES_QUERY = query(`
{
  me {
    timeline {
      recipes {
        id
        name
        yield
        equipment {
          id
          name
          washable
          
        }
        ingredients {
          id
          name
          quantity
          scale
        }
      }
    }
  }
}
`);

const RecipeCell = ({ history, recipe }) => (
  <ListItem
    primaryText={recipe.name}
    secondaryText={`Makes ${recipe.yield} bowls`}
    onClick={() => history.push(`/recipes/${recipe.id}`)}
  />
);

export default ({ history }) => (
  <Grid>
    <Connect query={RECIPES_QUERY}>
      {({ data }) => (
        <Cell size={12}>
          <List className="md-list-no-background">
            <CSSTransitionGroup
              transitionName="list-transition"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={200}
              style={{ width: '100%' }}
            >
              {get(data, 'me.timeline.recipes', []).map(recipe => (
                <RecipeCell history={history} key={recipe.id} recipe={recipe} />
              ))}
            </CSSTransitionGroup>
          </List>
        </Cell>
      )}
    </Connect>
    <Button
      tooltipLabel="Create a Recipe"
      tooltipPosition="left"
      primary
      fixed
      floating
      onClick={() => history.push('/new-recipe')}
    >
      add
    </Button>
  </Grid>
);
