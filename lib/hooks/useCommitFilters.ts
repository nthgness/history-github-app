import { useMemo, useState } from "react";
import type { CommitDisplayData } from "@/types";

export const useCommitFilters = (commits: CommitDisplayData[]) => {
  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  // Get unique authors from commits
  const authors = useMemo(() => {
    const uniqueAuthors = new Set(commits.map((c) => c.authorName));
    return Array.from(uniqueAuthors).sort();
  }, [commits]);

  // Filter commits based on search and author
  const filteredCommits = useMemo(() => {
    return commits.filter((commit) => {
      const matchesSearch =
        search === "" ||
        commit.message.toLowerCase().includes(search.toLowerCase()) ||
        commit.authorName.toLowerCase().includes(search.toLowerCase());

      const matchesAuthor =
        selectedAuthor === "all" || commit.authorName === selectedAuthor;

      return matchesSearch && matchesAuthor;
    });
  }, [commits, search, selectedAuthor]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
  };

  const handleClear = () => {
    setSearch("");
    setSelectedAuthor("all");
  };

  const hasFilters = search !== "" || selectedAuthor !== "all";

  return {
    search,
    selectedAuthor,
    authors,
    filteredCommits,
    totalCount: commits.length,
    filteredCount: filteredCommits.length,
    hasFilters,
    handleSearchChange,
    handleAuthorChange,
    handleClear,
  };
};
