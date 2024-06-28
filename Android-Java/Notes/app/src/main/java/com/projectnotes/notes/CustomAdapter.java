package com.projectnotes.notes;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;

public class CustomAdapter extends RecyclerView.Adapter<CustomAdapter.ViewHolder> {
    private ArrayList<String[]> localDataSet;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView noteTitle;
        private final TextView noteText;
        private final ConstraintLayout row;

        public ViewHolder(View view) {
            super(view);
            row = (ConstraintLayout) view.findViewById(R.id.row);
            noteTitle = (TextView) view.findViewById(R.id.noteTitle);
            noteText = (TextView) view.findViewById(R.id.noteText);
        }

        public TextView getnoteTitle() {
            return noteTitle;
        }
        public TextView getnoteText() {
            return noteText;
        }

        public void setListener(int noteId) {
            this.row.setOnClickListener(v -> {
                Intent intent = new Intent(v.getContext(), ViewNote.class);
                intent.putExtra("noteId", noteId);
                intent.putExtra("noteTitle", noteTitle.getText().toString());
                intent.putExtra("noteText", noteText.getText().toString());
                v.getContext().startActivity(intent);
            });
        }
    }

    public CustomAdapter(ArrayList<String[]> dataSet) {
        localDataSet = dataSet;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.row_item, viewGroup, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
        viewHolder.getnoteTitle().setText(localDataSet.get(position)[1]);
        viewHolder.getnoteText().setText(localDataSet.get(position)[2]);
        viewHolder.setListener(Integer.parseInt(localDataSet.get(position)[0]));
    }

    @Override
    public int getItemCount() {
        return localDataSet.size();
    }
}
