export const lock = (user) =>
  ({
    LOCK: {
      where: {
        email: user.email
      },
      data: {
        account_locked: user.failed_logins < 2 ? false : true,
        failed_logins: user.failed_logins + 1,
      },
    },
    UNLOCK: {
      where: {
        email: user.email,
      },
      data: {
        account_locked: false,
        failed_logins: 0,
      },
    },
  })

const resolverPartial = (resolver) => (payload, action) =>
  resolver(payload)[action == null ? "LOCK" : action]


const accountStateResolver = resolverPartial(lock)

export default accountStateResolver