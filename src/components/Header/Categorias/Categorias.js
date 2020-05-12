//From dependencies
import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

//From services
import InitPath from "../../../services/InitPath";

//Materail-ui
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Divider from "@material-ui/core/Divider";

//Stylesheet
import useStyles from "./style";

//From redux
import { salvaCategorias } from "../../../redux/actions/categoriaActions";

function Categorias(props) {
  const classes = useStyles();

  return (
    <div className={classes.second_header}>
      <MenuList className={classes.menu}>
        <div className={classes.div_link}>
          <MenuItem
            exact
            key={`Todos`}
            className={classes.link}
            component={NavLink}
            to={`${InitPath}/`}
          >
            <Typography>Home</Typography>
          </MenuItem>
        </div>
        {!Object.values(props.categorias).length
          ? ""
          : props.categorias.map((cat) => (
              <div className={classes.div_link} key={`div${cat.id}`}>
                <Divider
                  className={classes.Line}
                  orientation="vertical"
                  key={`divider${cat.id}`}
                  flexItem
                />
                <MenuItem
                  key={`categorias${cat.id}`}
                  className={classes.link}
                  component={NavLink}
                  to={`${InitPath}/categoria/${cat.id}`}
                >
                  <Typography>{cat.name}</Typography>
                </MenuItem>
              </div>
            ))}
      </MenuList>
      <div className={classes.botao}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          className={classes.button_link}
          component={NavLink}
          to="/montesuaporta"
        >
          Monte a sua porta
          <ArrowForwardIcon className={classes.arrow} fontSize="large" />
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ categorias: state.categorias });

export default connect(mapStateToProps, salvaCategorias)(Categorias);
