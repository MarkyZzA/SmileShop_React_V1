/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useSelector } from "react-redux";
import { ROLES } from "../../../../../Constants";
import Hoc from "../../../../../app/modules/Common/components/Hoc";
import DvrIcon from "@material-ui/icons/Dvr";
import Icon from "@material-ui/core/Icon";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const authReducer = useSelector(({ auth }) => auth);

  const isShowMenu = (roles) => {
    roles = roles === undefined ? [] : roles;
    if (roles.length > 0) {
      // check if route is restricted by role
      let intersection = roles.filter((x) => authReducer.roles.includes(x));
      return intersection.length > 0;
    } else {
      return true;
    }
  };

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <Hoc>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <DvrIcon></DvrIcon>
            </span>
            <span className="menu-text">dashboard</span>
          </NavLink>
        </li> */}

        {/* Demo zone สามารถ comment ทิ้งได้ */}
        <>
          {/* Custom roles */}
          {isShowMenu([ROLES.developer, ROLES.Manager]) && (
            <Hoc>
              {/* begin::section */}
              <li className="menu-section ">
                <h4 className="menu-text">Demo Custom roles</h4>
                <i className="menu-icon flaticon-more-v2"></i>
              </li>

              {/* end:: section */}

              {/*begin::1 Level*/}
              <li
                className={`menu-item ${getMenuItemActive("/test", false)}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/test">
                  <span className="svg-icon menu-icon">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Food/Bucket.svg")}
                    />
                  </span>
                  <span className="menu-text">test</span>
                </NavLink>
              </li>
              {/*end::1 Level*/}
            </Hoc>
          )}

          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Employee</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>

          {/* end:: section */}

          {/*begin::1 newEmployee*/}
          <li
            className={`menu-item ${getMenuItemActive("/employee/new", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/employee/new">
              <span className="svg-icon menu-icon">
                <Icon>star</Icon>
              </span>
              <span className="menu-text">New Employee</span>
            </NavLink>
          </li>
          {/*End::1 newEmployee*/}

          {/*begin::1 Employee List*/}
          <li
            className={`menu-item ${getMenuItemActive("/employee/", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/employee/">
              <span className="svg-icon menu-icon">
                <Icon>supervisor_account</Icon>
              </span>
              <span className="menu-text">Employee</span>
            </NavLink>
          </li>
          {/*End::1 Employee List*/}
        </>
        {/* End Demo สามารถ comment ทิ้งได้ */}

        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Order</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>

        {/* end:: section */}

        {/*begin::1 new Order*/}
        <li
          className={`menu-item ${getMenuItemActive("/orders/new", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/orders/new">
            <span className="svg-icon menu-icon">
              <Icon>star</Icon>
            </span>
            <span className="menu-text">New Order</span>
          </NavLink>
        </li>
        {/*End::1 new Order*/}

        {/*begin::1 Order List*/}
        <li
          className={`menu-item ${getMenuItemActive("/orders/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/orders/">
            <span className="svg-icon menu-icon">
              <Icon>supervisor_account</Icon>
            </span>
            <span className="menu-text">Orders</span>
          </NavLink>
        </li>
        {/*End::1 Order List*/}

        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Manage Shop</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>

        {/* end:: section */}

        {/*begin::1 new ProductGroup*/}
        <li
          className={`menu-item ${getMenuItemActive("/productgroups/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/productgroups/">
            <span className="svg-icon menu-icon">
              <Icon>star</Icon>
            </span>
            <span className="menu-text">Product Group</span>
          </NavLink>
        </li>
        {/*End::1 new ProductGroup*/}

        {/*begin::1 Product List*/}
        <li
          className={`menu-item ${getMenuItemActive("/products/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/products/">
            <span className="svg-icon menu-icon">
              <Icon>supervisor_account</Icon>
            </span>
            <span className="menu-text">Product</span>
          </NavLink>
        </li>
        {/*End::1 Product List*/}
      </ul>
      {/* end::Menu Nav */}
    </Hoc>
  );
}
