const jobs = [
  { id: 1, company: "OpenAI", position: "Frontend Dev", status: "Applied" },
];

export default function DashboardPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Job Tracker</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="mb-2 p-4 border rounded">
            <strong>{job.position}</strong> @ {job.company}
            <div className="text-sm text-gray-500">Status: {job.status}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}