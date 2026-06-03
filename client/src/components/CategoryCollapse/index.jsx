import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import Button from "@mui/material/Button";

export const CategoryCollapse = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);

  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  return (
    <>
      <div className="scroll">
        <ul className="w-full">
          {props?.data?.length !== 0 &&
            props?.data?.map((cat, index) => {
              return (
                <li
                  className="list-none flex items-center relative flex-col"
                  key={index}
                >
                  {/* CATEGORY */}

                  <Link
                    to={`/products?catId=${cat?._id}`}
                    className="w-full"
                    onClick={() => props?.closePanel()}
                  >
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      {cat?.name}
                    </Button>
                  </Link>

                  {/* SUBMENU TOGGLE */}

                  <div
                    className="absolute w-[30px] h-[30px] flex items-center justify-center top-[10px] right-[15px] cursor-pointer"
                    onClick={() => openSubmenu(index)}
                  >
                    {submenuIndex === index ? (
                      <FiChevronDown className="text-[22px]" />
                    ) : (
                      <FiChevronRight className="text-[22px]" />
                    )}
                  </div>

                  {/* SUB CATEGORY */}

                  {submenuIndex === index && (
                    <ul className="submenu w-full py-6 pl-3">
                      {cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index_) => {
                          return (
                            <li className="list-none relative" key={index_}>
                              <Link
                                to={`/products?subCatId=${subCat?._id}`}
                                className="w-full"
                                onClick={() => props?.closePanel()}
                              >
                                <Button
                                  className="
    w-full
    !justify-between
    !text-left
    !px-6
    !py-5
    !text-[18px]
    !font-[600]
    !text-black
    hover:!bg-[#f8f8f8]
    !normal-case
  "
                                >
                                  {subCat?.name}
                                </Button>
                              </Link>

                              {/* INNER SUBMENU TOGGLE */}

                              <div
                                className="absolute w-[30px] h-[30px] flex items-center justify-center top-[10px] right-[15px] cursor-pointer"
                                onClick={() => openInnerSubmenu(index_)}
                              >
                                {innerSubmenuIndex === index_ ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronRight />
                                )}
                              </div>

                              {/* THIRD LEVEL CATEGORY */}

                              {innerSubmenuIndex === index_ && (
                                <ul className="inner_submenu w-full pl-3">
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map(
                                      (thirdLavelCat, index__) => {
                                        return (
                                          <li
                                            className="list-none relative mb-1"
                                            key={index__}
                                          >
                                            <Link
                                              to={`/products?thirdLavelCatId=${thirdLavelCat?._id}`}
                                              className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                              onClick={() =>
                                                props?.closePanel()
                                              }
                                            >
                                              {thirdLavelCat?.name}
                                            </Link>
                                          </li>
                                        );
                                      },
                                    )}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
