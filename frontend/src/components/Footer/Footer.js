/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer className={"footer border-top" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <nav className="footer-nav d-flex justify-content-between align-items-center">
            <ul>
              <li>
                <a href="https://r2logics.com/" target="_blank">
                  R2Logics Technologies Pvt Ltd .
                </a>
              </li>
            </ul>
          <div className="credits ms-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getYear() + "  "}
            </div>
          </div>
          </nav>
        </Row>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
