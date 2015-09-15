# Only one active window on desktop
- When window restore from minimized state all other windows minimize automatically.
- When window minimized previous active window restore.
- Script don't apply for dialog and system windows.

Use this script to toggle active state kwin script:

    #!/bin/bash
    CONFIG=$HOME/.kde/share/config/kwinrc
    state=`qdbus org.kde.kwin /Scripting isScriptLoaded onlyOneActiveWindow`
    if [[ "$state" == "false" ]]; then
      state2="true"
    else
      state2="false"
    fi
    sed -i "s/onlyOneActiveWindowEnabled=$state/onlyOneActiveWindowEnabled=$state2/" $CONFIG
    qdbus org.kde.kwin /Scripting start


