import React from 'react';

const NotificationsPopup = () => {
  // Example notifications data — in a real app this would come from props, context, or an API
  const notifications = [
    { id: 1, message: 'New comment on your post', time: '2m ago' },
    { id: 2, message: 'Your password was changed successfully', time: '10m ago' },
    { id: 3, message: 'Update available for the app', time: '1h ago' },
    { id: 4, message: 'Reminder: Meeting at 3 PM', time: '2h ago' },
  ];

  return (
    <ul className="flex flex-col gap-px text-sm w-60">
      {notifications.map((note) => (
        <li
          key={note.id}
          className="hover:bg-light-alt hover:dark:bg-dark-alt px-3 py-2 rounded-md flex flex-col"
        >
          <span className="font-medium text-xs">{note.message}</span>
          <span className="text-xs text-gray-500">{note.time}</span>
        </li>
      ))}
      <hr className="bg-light-alt dark:bg-dark-alt border-0 h-px my-2" />
      <li className="text-center text-xs text-gray-400 cursor-pointer pb-px">View all notifications</li>
    </ul>
  );
};

export default NotificationsPopup;