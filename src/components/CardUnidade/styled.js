import styled from "@emotion/styled";
import { Badge } from "antd";

export const ImageCardCover = styled.div(({ theme, img }) => ({
  borderTopLeftRadius: theme.token.borderRadius,
  borderTopRightRadius: theme.token.borderRadius,
  height: 180,
  background: `url(${img})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  WebkitBackgroundSize: "cover",
  MozBackgroundSize: "cover",
  OBackgroundSize: "cover"
}));

export const Distance = styled.span(() => ({
  position: "absolute",
  marginLeft: 15,
  marginTop: 15,
  borderRadius: 50,
  padding: "5px 10px",
  backgroundColor: "white",
  color: "black",
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  display: "flex",
  alignItems: "center"
}));
