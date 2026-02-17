# Manual Configuration Required

## Auth Database Connection Strategy

### Issue
Your project's Auth server is currently configured to use a fixed number (10) of database connections. This means that increasing the database instance size will not automatically improve Auth server performance.

### Solution
Switch to a percentage-based connection allocation strategy:

1. Open your Supabase Dashboard
2. Navigate to **Project Settings** → **Database**
3. Find the **Connection Pooling** section
4. Locate the **Auth server connections** setting
5. Change the connection mode from **"Fixed (10 connections)"** to **"Percentage"**
6. Set an appropriate percentage (recommended: 5-10% of total connections)

### Why This Matters
- **Fixed connections**: Auth server always uses exactly 10 connections, regardless of instance size
- **Percentage-based**: Auth server scales connections automatically as you upgrade your database instance
- **Result**: Better performance and resource utilization as your application grows

### Impact
After making this change:
- Auth operations will scale better with your database
- No downtime required
- Immediate performance improvement during high Auth load

---

**Note**: This is a project-level configuration that cannot be changed via SQL migrations and must be configured through the Supabase Dashboard.
