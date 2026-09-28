import PortfolioClientView from "./PortfolioClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Production Portfolio & Case Studies | Tree Media Agency",
  description:
    "Explore international theatrical releases, luxury fashion commercials, and award-winning documentary productions managed and cast by Tree Media.",
};

export default function PortfolioPage() {
  return <PortfolioClientView />;
}
