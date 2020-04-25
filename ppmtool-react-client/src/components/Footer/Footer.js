/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "../../assets/js/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://sotomaque.github.io/personal/#about"
                className={classes.block}
                target="_blank"
              >
                About Me
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://sotomaque.github.io/personal/#projects"
                className={classes.block}
                target="_blank"
              >
                Projects
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://gitconnected.com/sotomaque/resume"
                className={classes.block}
                target="_blank"
              >
                Resume
              </a>
            </ListItem>

          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} {" "}
            <a
                href="https://www.sotomaque.github.io/personal"
                className={aClasses}
                target="_blank"
            >
                Enrique Sotomayor
            </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
