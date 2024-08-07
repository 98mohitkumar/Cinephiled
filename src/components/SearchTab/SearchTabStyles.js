import styled from "styled-components";

export const SearchTabWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: min(100%, 1100px);
  margin: auto;
  overflow-x: auto;
  border-bottom: 1px solid rgba(100, 100, 100, 0.9);

  &::-webkit-scrollbar {
    display: none;
  }

  /* for firefox */
  scrollbar-width: none;
`;

export const SearchTabSelector = styled.div`
  padding: 1rem 1.25rem;
  display: grid;
  place-items: center;
  color: ${({ $active }) => ($active ? "white" : "#ababab")};
  font-weight: 600;
  cursor: pointer;
  z-index: 5;
  white-space: nowrap;
  transition: color 0.4s cubic-bezier(0.77, 0, 0.18, 1);
  min-width: 120px;
  user-select: none;
  min-width: max-content;

  @media only ${(props) => props.theme.breakpoints.md} {
    font-size: 16px;
  }
`;

export const Keyword = styled.h2`
  font-size: 4rem;
  font-weight: 500;
  transition: color 0.3s ease-in;
  cursor: pointer;
  margin: 1rem 0rem;

  &:hover {
    color: white;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 2.5rem;
  }
`;

export const SearchHeading = styled.h1`
  font-weight: bold;
`;

export const SearchResultsContainer = styled.div`
  width: clamp(330px, 90vw, 1400px);
  margin: auto;
`;

export const QueryContainer = styled.div`
  height: 142px;
  width: 100%;
  background: white;
  border-radius: 10px;
  margin: 1.5rem 0rem;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14), 0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  outline: 1px solid rgba(255, 255, 255, 0.5);

  @media only ${(props) => props.theme.breakpoints.sm} {
    margin: 1rem 0rem;
  }
`;

export const QueryImg = styled.div`
  min-width: 6rem;
  height: 142px;
`;

export const QueryTitle = styled.span`
  color: #121212;
  font-weight: 500;
  font-size: 1.5rem;
  display: block;

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 20px;
    line-height: 1.2;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 16px;
  }
`;

export const QueryInfoWrapper = styled.div`
  padding: 0.65rem 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem;
  }
`;

export const QueryReleaseDate = styled.p`
  color: #818181;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 14px;
  }
`;

export const QueryDescription = styled.p`
  color: #121212;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  margin-top: 10px;
  margin-bottom: 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 0.9rem;
    margin-top: 10px;
    padding: 0.1rem 0rem;
    line-height: 1.2;
  }
`;

export const SortPill = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: #404040;
  color: white;
  font-size: clamp(12px, 2.2vw, 14px);
  cursor: pointer;
  transition: background-color 0.3s ease-in;
  user-select: none;

  &:hover {
    background: #303030;
  }
`;
