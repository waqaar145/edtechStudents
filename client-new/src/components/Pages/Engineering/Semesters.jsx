const Semesters = ({
  semesters,
  current_semester,
  handleSemester,
  emptyStateUrls,
  EmptyStateText,
}) => {
  return (
    <ul>
      {semesters.length > 0 ? (
        semesters.map((semester) => {
          return (
            <li
              key={semester.id}
              className="custom-card-body-element"
              onClick={() => handleSemester(semester.id)}
              className={current_semester === semester.id ? "active" : ""}
            >
              <a>{semester.name}</a>
            </li>
          );
        })
      ) : (
        <EmptyStateText
          text="No semesters found."
          subText="Please try after sometime."
          image={emptyStateUrls.emptyState.enggSemstersList}
        />
      )}
    </ul>
  );
};

export default Semesters;
